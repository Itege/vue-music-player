<template>
	<div class="border-t h-24">
		<div ref="progress" class="h-1 flex flex-row bg-gradient-to-r from-green-500 via-green-800 to-gray-700" @click="setProgress($event)">
			<div class="h-1 bg-transparent" :style="`flex: ${currentTime};`" />
			<div class="h-1 bg-white" :style="`flex: ${duration - currentTime};`" />
		</div>
		<div class="grid grid-cols-3">
			<div class="flex flex-row gap-2">
				<div class="flex-none h-24 w-24 flex flex-col justify-center">
					<img
						v-if="currentTrack.cover"
						:src="`music/artwork/${currentTrack.cover}`"
					/>
				</div>
				<div class="flex flex-col p-2 whitespace-nowrap overflow-hidden">
					<div class="font-bold">{{currentTrack.songname}}</div> 
					<div>{{currentTrack.artist}}</div>
					<div class="font-gray-400">{{currentTrack.album}}</div>
				</div>
			</div>
			<div class="flex justify-center font-2xl text-center items-center gap-2">
				<button @click="setRepeat(!repeat)">
					<i class="fas fa-sync p-1 bg-gray-100 hover:bg-gray-200 rounded-md" :class="{'text-black': repeat, 'text-gray-400': !repeat}" />
				</button>
				<button @click="prevSong">
					<i class="fas fa-step-backward bg-gray-200 hover:bg-gray-300 p-4 rounded-full" />
				</button>
				<button>
					<i
						v-if="playing"
						class="fas fa-pause bg-green-500 hover:bg-green-600 p-4 rounded-full text-white"
						@click="play(false)"
					/><i
						v-else
						class="fas fa-play bg-green-500 hover:bg-green-600 p-4 rounded-full text-white"
						@click="play(true)"
					/>
				</button>
				<button @click="nextSong">
					<i
						class="fas fa-step-forward bg-gray-200 hover:bg-gray-300 p-4 rounded-full"
					/>
				</button>
				<button @click="setShuffle(!shuffle)">
					<i class="fas fa-random p-1 bg-gray-100 hover:bg-gray-200 rounded-md" :class="{'text-black': shuffle, 'text-gray-400': !shuffle}" />
				</button>
			</div>
			<div class="grid grid-cols-2">
				<div class="text-right flex flex-col justify-center pr-8">
					<input
						v-model="volume"
						class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 flex-none hidden lg:block"
						type="range"
						min="0"
						max="1"
						step=".01"
					/>
				</div>
				<div class="text-right flex flex-col justify-center pr-8">
					<playlist />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {defineComponent, watch} from "vue";
import ApplicationState, {TransportController} from "@/ApplicationState";
import Playlist from "@/components/transport/Playlist.vue";

let player: HTMLAudioElement = document.createElement("audio");

export default defineComponent({
	name: "Transport",
	components: {Playlist},
	data() {
		return {
			tracklist: ApplicationState.tracklist,
			playlist: ApplicationState.playlist,
			playing: TransportController.playing,
			duration: 1,
			currentTime: 0,
			currentTrack: TransportController.currentTrack,
			repeat: TransportController.repeat,
			shuffle: TransportController.shuffle,
			volume : TransportController.volume.value,
		};
	},
	watch: {
		volume() {
			let vol = parseFloat(String(this.volume));
			TransportController.setVolume(vol);
			player.volume = vol;
			this.updateProgress();
		},
		currentTrack() {
			player.src = `music/songs/${this.currentTrack.filename}`;
		},
	},
	mounted() {
		player.volume = this.volume;
		player.addEventListener("ended", this.nextSong);
		player.addEventListener("timeupdate", () => {
			this.updateProgress();
		});
		TransportController.setPlayAction(this.play);
		watch(TransportController.volume, (val) => {
			this.volume = val;
			TransportController.setVolume(this.volume);
			player.volume = this.volume;
			this.updateProgress();
		});
	},
	methods: {
		play(shouldPlay: boolean): void {
			if (shouldPlay) { 
				player.play();
			} else {
				player.pause();
			}
			TransportController.setPlaying(shouldPlay);
		},
		updateProgress(): void {
			this.currentTime = player.currentTime;
			this.duration = player.duration;
		},
		setProgress (event: MouseEvent) {
			let progress = this.$refs.progress; 
			if (progress instanceof HTMLElement) {
				player.currentTime =
					(event.pageX /progress.offsetWidth) *
					this.duration;
			}
		},
		prevSong() {
			TransportController.prevSong();
		},
		nextSong() {
			TransportController.nextSong();
		},
		setRepeat(repeat: boolean): void {
			TransportController.setRepeat(repeat);
		},
		setShuffle(shuffle: boolean): void {
			TransportController.setShuffle(shuffle);
		},
	},
});
</script>

<style lang="postcss" scoped>
		.range-thumbs {
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			width: 15px;
			height: 15px;
			cursor: ew-resize;
			box-shadow: -405px 0 0 400px rgb(16, 185, 129);
			@apply rounded-full;
			@apply bg-green-800;
			@apply border;
			@apply border-green-800;
		}

		input[type="range"]::-moz-range-thumb {
			@apply range-thumbs;
		},
        input[type="range"]::-webkit-slider-thumb {
			@apply range-thumbs;
        }
</style>