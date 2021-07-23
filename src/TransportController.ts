import * as types from "@/Types";
import {nextTick, computed} from "vue";

export const initTransportController = (state: types.State): types.TransportController => {
	return {
		trackIdx: computed(() => state.trackIdx),
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
};