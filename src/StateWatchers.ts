import {watch} from "vue";
import * as types from "@/Types";

const shufflePlaylist = (arr: number[]): number[] => {
	let i = arr.length, k, temp;
	while (--i > 0){
	   k = Math.floor(Math.random() * (i+1));
	   temp = arr[k];
	   arr[k] = arr[i];
	   arr[i] = temp;
	}
	return arr;
};

export function configureStateWatchers(state: types.State) {
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
}
