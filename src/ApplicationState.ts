import * as types from "@/Types";
import {reactive, computed, ComputedRef, nextTick, watch} from "vue";

type StorageState = {
	originalPlaylist: number[]
	shuffledPlaylist: number[]
	trackIdx: number
	repeat: boolean
	shuffle: boolean
	volume: number
};

interface State extends StorageState  {
	tracklist: types.Song[],
	playing: boolean,
}

type ApplicationStore = {
	tracklist: ComputedRef<types.Song[]>,
	playlist: ComputedRef<number[]>,
	trackIdx: ComputedRef<number>,
	currentTrack: ComputedRef<types.Song>,
	volume: ComputedRef<number>,
	repeat: ComputedRef<boolean>,
	shuffle: ComputedRef<boolean>,
	playing: ComputedRef<boolean>,
	artists: ComputedRef<Record<string, types.Artist>>,
	albums: ComputedRef<Record<string, types.Album>>,
	addAllToPlaylist(playlist: number[]): void;
	setPlaylist(playlist: number[]): void;
	callback(shouldPlay: boolean): void;
	changeSong(idx: number, play?: boolean): void;
	nextSong(): void;
	prevSong(): void;
	playNow(idx: number): void;
	playPause(): void;
	setPlayAction(callback: (shouldPlay: boolean) => void): void;
	setRepeat(rep: boolean): void;
	setShuffle(shuffle: boolean): void;
	setPlaying(playing: boolean): void;
	setVolume(vol: number): void;
};


const stored: StorageState = JSON.parse(localStorage.getItem("chunes") || "{}");
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
		const artist = artists[artistName];
		if (!artist) {
			const albumSet: Set<string> = new Set();
			const coverSet: Set<string> = new Set();
			const songs: number[] = [];
			albumSet.add(track.album);
			coverSet.add(track.cover);
			songs.push(parseInt(i));
			artists[artistName] = {
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


const shufflePlaylist = (arr: number[]): number[] => {
	let i = arr.length, k, temp;      // k is to generate random index and temp is to swap the values
	while (--i > 0){
	   k = Math.floor(Math.random() * (i+1));
	   temp = arr[k];
	   arr[k] = arr[i];
	   arr[i] = temp;
	}
	return arr;
};
const state: State = reactive({
	tracklist,
	originalPlaylist: reactive(originalPlaylist),
	shuffledPlaylist: reactive(shuffledPlaylist),
	trackIdx,
	repeat,
	shuffle,
	volume,
	playing: false,
});
const setCurrentTrack = (idx: number): void => {
	state.trackIdx = idx;
};
const clearPlaylist = (): void => {
	state.originalPlaylist.splice(0);
};
const addToPlaylist = (idx: number): void => {
	state.originalPlaylist.push(idx);
};

const store: ApplicationStore = {
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
		clearPlaylist();
		playlist.forEach(s => state.originalPlaylist.push(s));
	},
	changeSong(idx: number, play = true): void {
		setCurrentTrack(idx);
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
		clearPlaylist();
		addToPlaylist(idx);
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


watch(state, (newValues) => {
	localStorage.setItem("chunes", JSON.stringify({
		originalPlaylist: newValues.originalPlaylist,
		shuffledPlaylist: newValues.shuffledPlaylist,
		trackIdx: newValues.trackIdx,
		repeat: newValues.repeat,
		shuffle: newValues.shuffle,
		volume: newValues.volume,
	}));
});

watch([() => state.shuffle, state.originalPlaylist], () => {
	const oldTrack = state.shuffledPlaylist[state.trackIdx];
	let plClone = [...state.originalPlaylist];
	plClone = state.shuffle ? shufflePlaylist(plClone) : plClone;
	state.shuffledPlaylist = plClone;
	const newIdx = plClone.indexOf(oldTrack);
	state.trackIdx = newIdx > -1 ? newIdx : 0;
});


export default store;