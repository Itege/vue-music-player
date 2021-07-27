<template>
	<div class="pb-16">
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
		<track-row
			v-for="(track, idx) of tracks"
			:key="idx"
			:track="track"
			:idx="idx"
			:show-menu="idx === focusedRow"
			@show-menu="focusRow"
			@click="focuedRow = -1"
		/>
	</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import TrackRow from "@/components/browser/Track.vue";

export default defineComponent({
	name: "Tracks",
	components: {
		TrackRow,
	},
	props: {
		tracks: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			focusedRow: -1,
		};
	},
	methods: {
		focusRow(idx: number) {
			this.focusedRow = idx;
		},
	},
});
</script>

<style scoped>

</style>