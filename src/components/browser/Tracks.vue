<template>
	<div>
		<div class="grid grid-cols-3 gap-1">
			<div class="font-bold p-2">
				Name
			</div>
			<div class="font-bold p-2">
				Artist
			</div>
			<div class="font-bold p-2">
				Album
			</div>
		</div>
		<div v-for="(track, idx) of tracks" :key="idx" class="grid grid-cols-3 gap-1 cursor-pointer hover:bg-gray-100" @dblclick="overridePlaylist(idx, track.idx)">
			<div class="whitespace-nowrap flex-grow overflow-hidden p-2">
				{{track.songname}}
			</div>
			<div class="whitespace-nowrap flex-grow overflow-hidden p-2">
				{{track.artist}}
			</div>
			<div class="whitespace-nowrap flex-grow overflow-hidden p-2">
				{{track.album}}
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {TransportController} from "@/ApplicationState";

export default defineComponent({
	name: "Tracks",
	props: {
		tracks: {
			type: Array,
			required: true,
		},
	},
	methods: {
		overridePlaylist(idx: number, trackIdx: number) {
			let i = trackIdx !== undefined ? trackIdx : idx;
			TransportController.playNow(i);
		},
	},
});
</script>
