<template>
	<div class="rounded-md shadow-md border overflow-hidden flex flex-col cursor-pointer bg-white">
		<div class="p-2 flex-grow flex justify-center items-center">
			<div class="relative">
				<img :src="`images/${album.cover}`" class="flex-none" />
				<div v-if="showMenu" class="absolute inset-0 bg-white z-10">
					<button class="w-full p-2 font-semibold hover:bg-gray-200 text-left" @click.stop="playAlbum">Play now</button>
					<button class="w-full p-2 font-semibold hover:bg-gray-200 text-left" @click.stop="addAlbum">Add to queue</button>
				</div>
			</div>
		</div>
		<div class="text-md py-2 px-5 text-center whitespace-nowrap gap-1 relative w-full">
			<div class="overflow-hidden">
				{{album.name}}
			</div>
			<div class="absolute top-1/2 transform -translate-y-1/2 right-1 px-2 hover:bg-gray-200 rounded-full hover:bg-opacity-70" @click.stop="showMenu = !showMenu"><i class="fas fa-ellipsis-v" /></div>
		</div>
	</div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import * as types from "@/Types";
import trackStore from "@/TrackStore";
import TransportState from "@/TransportState";

export default defineComponent({
	name: "Album",
	props: {
		album: {
			type: Object as PropType<types.Album>,
			required: true,
		},
	},
	data() {
		return {
			showMenu: false,
		};
	},
	methods: {
		playAlbum() {
			trackStore.setPlaylist(this.album.songs);
			TransportState.changeSong(0);
			this.showMenu = false;
		},
		addAlbum() {
			trackStore.addAllToPlaylist(this.album.songs);
			this.showMenu = false;
		},
	},
});
</script>
