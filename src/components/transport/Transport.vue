<template>
	<div class="border-t h-24">
		<div ref="progress" class="h-1 flex flex-row" @click="setProgress($event)">
			<div class="h-1 bg-green-500" :style="`flex: ${currentTime}`" />
			<div class="h-1" :style="`flex: ${duration - currentTime}`" />
		</div>
		<div class="grid grid-cols-3">
			<div class="flex flex-row gap-2">
				<div class="flex-none h-24 w-24 flex flex-col justify-center">
					<img
						v-if="currentTrack.cover"
						:src="`images/${currentTrack.cover}`"
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
					<i class="fas fa-sync p-1 bg-gray-100 rounded-md" :class="{'text-black': repeat, 'text-gray-400': !repeat}" />
				</button>
				<button @click="prevSong">
					<i class="fas fa-step-backward bg-gray-200 p-4 rounded-full" />
				</button>
				<button>
					<i
						v-if="playing"
						class="fas fa-pause bg-green-500 p-4 rounded-full text-white"
						@click="play(false)"
					/><i
						v-else
						class="fas fa-play bg-green-500 p-4 rounded-full text-white"
						@click="play(true)"
					/>
				</button>
				<button @click="nextSong">
					<i
						class="fas fa-step-forward bg-gray-200 p-4 rounded-full"
					/>
				</button>
				<button @click="setShuffle(!shuffle)">
					<i class="fas fa-random p-1 bg-gray-100 rounded-md" :class="{'text-black': shuffle, 'text-gray-400': !shuffle}" />
				</button>
				<audio
					ref="player"
					:src="`audio/${currentTrack.filename}`"
					hidden
					@timeupdate="updateProgress($event)"
					@ended="nextSong"
				/>
			</div>
			<div class="grid grid-cols-2">
				<div class="text-right flex flex-col justify-center pr-8">
					<input
						v-model="volume"
						class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 flex-none hidden lg:block"
						type="range"
						min="0"
						max="1"
						step=".1"
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
import {defineComponent} from "vue";
import ApplicationState from "@/ApplicationState";
import Playlist from "@/components/transport/Playlist.vue";

export default defineComponent({
	name: "Transport",
	components: {Playlist},
	data() {
		return {
			tracklist: ApplicationState.tracklist,
			playlist: ApplicationState.playlist,
			playing: ApplicationState.playing,
			duration: 0,
			currentTime: 0,
			currentTrack: ApplicationState.currentTrack,
			repeat: ApplicationState.repeat,
			shuffle: ApplicationState.shuffle,
			volume: ApplicationState.volume,
		};
	},
	watch: {
		volume() {
			let player = this.$refs.player;
			if (player instanceof HTMLAudioElement) {
				ApplicationState.setVolume(this.volume);
				player.volume = this.volume;
			}
		},
	},
	mounted() {
		ApplicationState.setPlayAction(this.play);
	},
	methods: {
		play(shouldPlay: boolean): void {
			let player = this.$refs.player;
			if (player instanceof HTMLAudioElement) {
				if (shouldPlay) { 
					player.play();
				} else {
					player.pause();
				}
				ApplicationState.setPlaying(shouldPlay);
			}
		},
		updateProgress(event: Event) {
			if (event.target !== null) {
				let target = event.target;
				if (target instanceof HTMLAudioElement) {
					this.currentTime = target.currentTime;
					this.duration = target.duration;
				}
			}
		},
		setProgress (event: MouseEvent) {
			let player =  this.$refs.player;
			let progress = this.$refs.progress;
			if (progress instanceof HTMLElement && player instanceof HTMLAudioElement) {
				player.currentTime =
					(event.pageX /progress.offsetWidth) *
					this.duration;
			}
		},
		nextSong() {
			ApplicationState.nextSong();
		},
		prevSong() {
			ApplicationState.prevSong();
		},
		setRepeat: ApplicationState.setRepeat,
		setShuffle: ApplicationState.setShuffle,
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