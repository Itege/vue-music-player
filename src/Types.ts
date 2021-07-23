import {ComputedRef} from "svue";

export type Song = {
	album: string
	albumArtist: string
	artist: string
	cover: string
	filename: string
	songname: string
	tracknum: string
	idx?: number
};

export type Artist = {
	name: string,
	albums: Set<string>,
	covers: Set<string>,
	songs: number[],
};


export type Album = {
	name: string,
	cover: string,
	songs: number[],
};



export type StorageState = {
	originalPlaylist: number[]
	shuffledPlaylist: number[]
	trackIdx: number
	repeat: boolean
	shuffle: boolean
	volume: number
};

export interface State extends StorageState  {
	tracklist: Song[],
	playing: boolean,
}

export type ApplicationController = {
	tracklist: ComputedRef<Song[]>,
	playlist: ComputedRef<number[]>,
	artists: ComputedRef<Record<string, Artist>>,
	albums: ComputedRef<Record<string, Album>>,
};

export type TransportController = {
	trackIdx: ComputedRef<number>,
	currentTrack: ComputedRef<Song>,
	volume: ComputedRef<number>,
	repeat: ComputedRef<boolean>,
	shuffle: ComputedRef<boolean>,
	playing: ComputedRef<boolean>,
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