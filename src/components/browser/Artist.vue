<template>
	<div class="rounded-md shadow-md border overflow-hidden flex flex-col cursor-pointer bg-white">
		<div class="p-2 flex-grow flex justify-center items-center">
			<div class="relative">
				<img :src="cover" class="flex-none" />
				<div v-if="showMenu" class="absolute inset-0 bg-white z-10">
					<button class="w-full p-2 font-semibold hover:bg-gray-200 text-left" @click.stop="playArtist">Play now</button>
					<button class="w-full p-2 font-semibold hover:bg-gray-200 text-left" @click.stop="addArtist">Add to queue</button>
				</div>
			</div>
		</div>
		<div class="text-md py-2 px-5 text-center whitespace-nowrap gap-1 relative w-full">
			<div class="overflow-hidden">{{artist.name}}</div>
			<div 
				class="absolute top-1/2 transform -translate-y-1/2 right-1 px-2 hover:bg-gray-200 rounded-full hover:bg-opacity-70"
				@click.stop="showMenu = !showMenu" 
			>
				<i class="fas fa-ellipsis-v" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import trackStore from "@/TrackStore";
import TransportState from "@/TransportState";
import {defineComponent} from "vue";

export default defineComponent({
	name: "Artist",
	props: {
		artist: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			showMenu: false,
		};
	},
	computed: {
		cover(): string {
			let rand = Math.floor(Math.random() * this.artist.covers.size);
			let ind = 0;
			for (let cover of this.artist.covers) {
				if (ind === rand) {
					return encodeURIComponent("images/" + cover);
				}
				ind++;
			}
			return "";
		},
	},
	methods: {
		playArtist() {
			trackStore.setPlaylist(this.artist.songs);
			TransportState.changeSong(0);
			this.showMenu = false;
		},
		addArtist() {
			trackStore.addAllToPlaylist(this.artist.songs);
			this.showMenu = false;
		},
	},
});
</script>
