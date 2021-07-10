import {reactive, computed, ComputedRef} from 'vue';
import * as types from "@/Types";
import TransportState from "@/TransportState";

type State = {
	tracklist: types.Song[],
	playlist: number[],
	currentTrack: number,
	artists: Record<string, types.Artist>,
	albums: Record<string, types.Album>,
};

const tracklist: types.Song[] = reactive([]);
fetch("tracklist.json")
	.then((r) => r.json())
	.then((j) => {
		tracklist.push(...j.sort((a: types.Song, b: types.Song) => {
			return a.songname.localeCompare(b.songname);
		}));
	});

const state: State = reactive({
	tracklist,
	playlist: reactive([0]),
	currentTrack: 0,
	artists: computed((): Record<string, types.Artist> => {
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
	}),
	albums: computed((): Record<string, types.Album> => {
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
				return result;
			}, {});
	}),
});

interface TrackStore {
	tracklist: ComputedRef<types.Song[]>,
	playlist: ComputedRef<number[]>,
	currentTrack: ComputedRef<number>,
	artists: ComputedRef<Record<string, types.Artist>>,
	albums: ComputedRef<Record<string, types.Album>>,
	setCurrentTrack(idx: number): void;
	clearPlaylist(): void;
	addToPlaylist(idx: number): void;
	addAllToPlaylist(playlist: number[]): void;
	setPlaylist(playlist: number[]): void;
}

const trackStore: TrackStore = {
	tracklist: computed(() => state.tracklist),
	playlist:  computed(() => {
		if (TransportState.shuffle) {
			return [...state.playlist].sort(() => Math.random() - 0.5);
		}
		return state.playlist;
	}),
	currentTrack:  computed(() => state.currentTrack),
	artists:  computed(() => state.artists),
	albums:  computed(() => state.albums),
	setCurrentTrack(idx: number): void {
		state.currentTrack = idx;
	},
	clearPlaylist(): void {
		state.playlist.splice(0);
	},
	addToPlaylist(idx: number): void {
		state.playlist.push(idx);
	},
	addAllToPlaylist(songs: number[]): void {
		state.playlist.push(...songs);
	},
	setPlaylist(playlist: number[]): void {
		this.clearPlaylist();
		state.playlist.push(...playlist);
	},
};

export default trackStore;