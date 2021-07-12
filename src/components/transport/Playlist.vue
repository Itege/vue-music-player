<template>
	<div>
		<button class="inline-block" @click="showPlaylist = !showPlaylist"><i class="text-xl fas fa-bars" /></button>
		<div v-if="tracklist.length > 0 && showPlaylist" class="playlist absolute bg-white border md:bottom-28 bottom-24 h-96 md:right-8 md:left-auto right-0 left-0 rounded-md p-4 md:w-1/3 w-full shadow-md">
			<div class="h-full w-full overflow-x-hidden overflow-auto rounded-md">
				<div v-for="song in playlist" :key="song" class="p-2 flex flex-row gap-2" :class="{'bg-gray-100': song === playlist[trackIdx]}">
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
import trackStore from "@/TrackStore.ts";

export default defineComponent({
	name: "Playlist",
	data() {
		return {
			tracklist: trackStore.tracklist,
			playlist: trackStore.playlist,
			trackIdx: trackStore.currentTrack,
			showPlaylist: false,
		};
	},
});
</script>

<style scoped lang="postcss">
.playlist .cover {
	@apply w-12;
	@apply h-12;
}
</style>
