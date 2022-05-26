<template>
	<div class="rounded-md shadow-md border overflow-hidden flex flex-col cursor-pointer bg-white">
		<div class="p-2 flex-grow flex justify-center items-center">
			<div class="relative">
				<card-menu v-if="showMenu" @add="add" @play="play" />
				<img :src="`music/artwork/${img || data.cover}`" class="flex-none" />
			</div>
		</div>
		<div class="text-md py-2 px-5 text-center whitespace-nowrap gap-1 relative w-full">
			<div class="overflow-hidden">{{data.name}}</div>
			<div 
				class="absolute top-1/2 transform -translate-y-1/2 right-1 px-2 bg-white hover:bg-gray-100 rounded-full"
				@click.stop="showMenu = !showMenu"
				@dblclick.stop
			>
				<i class="fas fa-ellipsis-v" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {defineComponent, nextTick, PropType} from 'vue';
import CardMenu from "@/components/browser/CardMenu.vue";
import * as types from "@/Types";
import {TransportController} from '@/ApplicationState';

export default defineComponent({
	name: "Card",
	components: {CardMenu},
	props: {
		data: {
			type: Object as PropType<types.Album | types.Artist>,
			required: true, 
		},
		img: {
			type: String,
			required: false,
			default: "",
		},
	},
	data() {
		return {
			showMenu: false,
		};
	},
	methods: {
		play() {
			TransportController.setPlaylist(this.data.songs);
			this.showMenu = false;
			nextTick(() => {
				TransportController.changeSong(0);
			});
		},
		add() {
			TransportController.addAllToPlaylist(this.data.songs);
			this.showMenu = false;
		},
	},
});
</script>
