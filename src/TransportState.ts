import {computed, nextTick, reactive} from "vue";
import * as types from "@/Types";
import trackStore from "./TrackStore";

type TrackState = {
	repeat: boolean,
	shuffle: boolean,
	playing: boolean,
};

const state: TrackState = reactive({
	repeat: true,
	shuffle: false,
	playing: false,
});

export default {
	callback: (shouldPlay: boolean):void => {
		throw Error("not configured " + shouldPlay);
	},
	changeSong(idx: number, play = true): void {
		trackStore.setCurrentTrack(idx);
		if (play) {
			nextTick(() => {
				this.callback(true);
			});
		}
	},
	nextSong(): void {
		const track = trackStore.currentTrack.value + 1;
		if (track < trackStore.playlist.value.length) {
			this.changeSong(track);
		} else {
			this.changeSong(0, state.repeat);
		}
	},
	prevSong(): void {
		const track = trackStore.currentTrack.value - 1;
		if (track >= 0) {
			this.changeSong(track);
		} else {
			this.changeSong(trackStore.playlist.value.length - 1);
		}
	},
	playNow(idx: number): void{
		trackStore.clearPlaylist();
		trackStore.addToPlaylist(idx);
		this.changeSong(0);
	},
	playPause():void {
		this.callback(!state.playing);
	},
	currentTrack: computed((): types.Song => {
		const tracklist = trackStore.tracklist.value;
		if (tracklist.length) {
			return tracklist[trackStore.playlist.value[trackStore.currentTrack.value]];
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
	repeat: computed((): boolean => state.repeat),
	shuffle: computed((): boolean => state.shuffle),
	playing: computed((): boolean => state.playing),
};