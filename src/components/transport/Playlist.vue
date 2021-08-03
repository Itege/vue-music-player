<template>
	<div>
		<button class="inline-block" @click="showPlaylist = !showPlaylist"><i class="text-xl fas fa-bars" /></button>
		<div v-if="tracklist.length > 0 && showPlaylist" class="playlist absolute bg-white border bottom-24 h-1/2 lg:right-4 lg:left-auto right-0 left-0 rounded-md p-4 lg:w-1/3 w-full shadow-md flex flex-col">
			<div class="text-left text-xl pb-4 font-bold">Now Playing</div>
			<div class="h-full w-full overflow-x-hidden overflow-auto rounded-md flex-grow">
				<div v-for="(song, idx) in playlist" :key="song" class="p-2 flex flex-row gap-2 hover:bg-gray-200 cursor-pointer" :class="{'bg-gray-100': idx === trackIdx}" @dblclick="playSong(idx)">
					<div class="flex-none">
						<img class="cover" :src="`images/${tracklist[song].cover}`" />
					</div>
					<div class="flex flex-col whitespace-nowrap overflow-none text-left">
						<div class="font-bold">{{tracklist[song].songname}}</div>
						<div class="text-xs">{{tracklist[song].albumArtist || tracklist[song].artist}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ApplicationState, {TransportController} from "@/ApplicationState";

export default defineComponent({
	name: "Playlist",
	data() {
		return {
			tracklist: ApplicationState.tracklist,
			playlist: ApplicationState.playlist,
			trackIdx: TransportController.trackIdx,
			showPlaylist: false,
		};
	},
	methods: {
		playSong: (idx: number) => TransportController.changeSong(idx),
	},
});
</script>

<style scoped lang="postcss">
.playlist .cover {
	@apply w-12;
	@apply h-12;
}
</style>
