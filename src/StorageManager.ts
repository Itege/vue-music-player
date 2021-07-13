import {watch} from "vue";
import trackStore from "@/TrackStore";
import transportState from "@/TransportState";

type StorageState = {
	playlist: number[]
	currentTrack: number
	repeat: boolean
	shuffle: boolean
};


const stored: StorageState = JSON.parse(localStorage.getItem("chunes") || "{}");
export const playlist: number[] = stored.playlist || [];
export const currentTrack: number = stored.currentTrack || 0;
export const shuffle: boolean = stored.shuffle !== undefined ? stored.shuffle : false;
export const repeat: boolean = stored.repeat !== undefined ? stored.repeat : true;
export function startWatcher(): void {
	watch([trackStore.playlist, trackStore.currentTrack, transportState.repeat, transportState.shuffle], (newValues) => {
		localStorage.setItem("chunes", JSON.stringify({playlist: newValues[0], currentTrack: newValues[1], repeat: newValues[2], shuffle: newValues[3]}));
	});
}