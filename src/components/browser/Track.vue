<template>
	<div class="grid grid-cols-3 gap-1 cursor-pointer hover:bg-gray-100 track-row" @dblclick="overridePlaylist(idx, track.idx)">
		<div class="whitespace-nowrap flex-grow overflow-hidden p-2">
			<div class="inline-block relative">
				<button class="px-4" @click.stop="toggleMenu(idx)" @dblclick.stop><i class="fas fa-ellipsis-v" /></button>
				<div v-if="showMenu" class="absolute left-8 top-0 bg-white z-10 border w-48">
					<button class="w-full p-2 font-semibold hover:bg-gray-200 text-left block" @click.stop="overridePlaylist(idx, track.idx)">Play now</button>
					<button class="w-full p-2 font-semibold hover:bg-gray-200 text-left block" @click.stop="addToQueue(idx, track.idx)">Add to queue</button>
				</div>
			</div>
			{{track.songname}}
		</div>
		<div class="whitespace-nowrap flex-grow overflow-hidden p-2">
			{{track.artist}}
		</div>
		<div class="whitespace-nowrap flex-grow overflow-hidden p-2">
			{{track.album}}
		</div>
	</div>
</template>

<script lang="ts">
import {TransportController} from '@/ApplicationState';
import {defineComponent, PropType} from 'vue';
import * as types from "@/Types";

export default defineComponent({
	name: "TrackRow",
	props: {
		track: {
			type: Object as PropType<types.Song>,
			required: true,
		},
		idx: {
			type: Number,
			required: true,
		},
		showMenu: {
			type: Boolean,
			default: false,
		},
	},
	emits: ["show-menu"],
	methods: {
		overridePlaylist(idx: number, trackIdx: number) {
			let i = trackIdx !== undefined ? trackIdx : idx;
			TransportController.playNow(i);
		},
		toggleMenu(idx: number) {
			if (this.showMenu) {
				this.$emit('show-menu', -1);
			} else {
				this.$emit('show-menu', idx);
			}
		},
		addToQueue(idx: number, trackIdx: number) {
			let i = trackIdx !== undefined ? trackIdx : idx;
			TransportController.addAllToPlaylist([i]);
			this.toggleMenu(-1);
		},
	},
});
</script>
