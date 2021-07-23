import * as types from "@/Types";
import {reactive, computed, nextTick} from "vue";
import {configureStateWatchers} from "./StateWatchers";

const stored: types.StorageState = JSON.parse(localStorage.getItem("chunes") || "{}");
const originalPlaylist: number[] = stored.originalPlaylist || [];
const shuffledPlaylist: number[] = stored.shuffledPlaylist || [];
const trackIdx: number = stored.trackIdx || 0;
const shuffle: boolean = stored.shuffle !== undefined ? stored.shuffle : false;
const repeat: boolean = stored.repeat !== undefined ? stored.repeat : true;
const volume: number = stored.volume !== undefined ? stored.volume : 1;

const tracklist: types.Song[] = reactive([]);
fetch("tracklist.json")
	.then((r) => r.json())
	.then((j) => {
		tracklist.push(...j.sort((a: types.Song, b: types.Song) => {
			return a.songname.localeCompare(b.songname);
		}));
	});

const collectArtists = (): Record<string, types.Artist> => {
	const artists: Record<string, types.Artist> = {};
	for (const i in state.tracklist) {
		const track = tracklist[i];
		const artistName = track.albumArtist || track.artist;
		const artist = artists[artistName.toLowerCase()];
		if (!artist) {
			const albumSet: Set<string> = new Set();
			const coverSet: Set<string> = new Set();
			const songs: number[] = [];
			albumSet.add(track.album);
			coverSet.add(track.cover);
			songs.push(parseInt(i));
			artists[artistName.toLowerCase()] = {
				name: artistName,
				albums: albumSet,
				covers: coverSet,
				songs,
			};
		} else {
			artist.albums.add(track.album);
			artist.covers.add(track.cover);
			artist.songs.push(parseInt(i));
		}
	}
	return Object.keys(artists)
		.sort()
		.reduce(function (result: Record<string, types.Artist>, key) {
			result[key] = artists[key];
			return result;
		}, {});
};

const collectAlbums = (): Record<string, types.Album> => {
	const albums: Record<string, types.Album> = {};
	for (const i in tracklist) {
		const track = tracklist[i];
		const albumName = track.album;
		const album = albums[albumName];
		if (!album) {
			const songs: number[] = [];
			songs.push(parseInt(i));
			albums[albumName] = {
				name: albumName,
				cover: track.cover,
				songs,
			};
		} else {
			album.songs.push(parseInt(i));
		}
	}
	
	return Object.keys(albums)
		.sort()
		.reduce(function (result: Record<string, types.Album>, key) {
			result[key] = albums[key];
			result[key].songs.sort((a, b) => {
				return parseInt(state.tracklist[a].tracknum) - parseInt(state.tracklist[b].tracknum);
			});
			return result;
		}, {});
};

const state: types.State = reactive({
	tracklist,
	originalPlaylist: reactive(originalPlaylist),
	shuffledPlaylist: reactive(shuffledPlaylist),
	trackIdx,
	repeat,
	shuffle,
	volume,
	playing: false,
});


const store: types.ApplicationStore = {
	tracklist: computed(() => state.tracklist),
	playlist:  computed(() => state.shuffledPlaylist),
	trackIdx: computed(() => state.trackIdx),
	artists: computed(collectArtists),
	albums: computed(collectAlbums),
	volume: computed(() => state.volume),
	repeat: computed((): boolean => state.repeat),
	shuffle: computed((): boolean => state.shuffle),
	playing: computed((): boolean => state.playing),
	addAllToPlaylist(songs: number[]): void {
		state.originalPlaylist.push(...songs);
	},
	setPlaylist(playlist: number[]): void {
		state.originalPlaylist.splice(0);
		playlist.forEach(s => state.originalPlaylist.push(s));
	},
	changeSong(idx: number, play = true): void {
		state.trackIdx = idx;
		if (play) {
			nextTick(() => {
				this.callback(true);
			});
		}
	},
	nextSong(): void {
		const track = state.trackIdx + 1;
		if (track < state.originalPlaylist.length) {
			this.changeSong(track);
		} else {
			this.changeSong(0, state.repeat);
		}
	},
	prevSong(): void {
		const track = state.trackIdx - 1;
		if (track >= 0) {
			this.changeSong(track);
		} else {
			this.changeSong(state.originalPlaylist.length - 1);
		}
	},
	playNow(idx: number): void {
		state.originalPlaylist.splice(0);
		state.originalPlaylist.push(idx);
		this.changeSong(0);
	},
	playPause(): void {
		this.callback(!state.playing);
	},
	currentTrack: computed((): types.Song => {
		if (state.tracklist.length > 0 && state.shuffledPlaylist.length > 0) {
			return state.tracklist[state.shuffledPlaylist[state.trackIdx]];
		}
		return {
			songname: "",
			artist: "",
			albumArtist: "",
			cover: "",
			filename: "",
			album: "",
			tracknum: "",
		};
	}),
	setPlayAction(callback: (shouldPlay: boolean) => void): void {
		this.callback = callback;
	},
	setRepeat(rep: boolean): void {
		state.repeat = rep;
	},
	setShuffle(shuffle: boolean): void {
		state.shuffle = shuffle;
	},
	setPlaying(playing: boolean): void {
		state.playing = playing;
	},
	callback: (shouldPlay: boolean): void => {
		throw Error("not configured " + shouldPlay);
	},
	setVolume(vol: number): void {
		state.volume = vol;
	},
};

configureStateWatchers(state);
export default store;