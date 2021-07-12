
<template>
	<card :data="artist" :img="cover" />
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import * as types from "@/Types";
import Card from "@/components/browser/Card.vue";

export default defineComponent({
	name: "Artist",
	components: {Card},
	props: {
		artist: {
			type: Object as PropType<types.Artist>,
			required: true, 
		},
	},
	computed: {
		cover(): string {
			let rand = Math.floor(Math.random() * this.artist.covers.size);
			let ind = 0;
			for (let cover of this.artist.covers) {
				if (ind === rand) {
					return cover;
				}
				ind++;
			}
			return "";
		},
	},
});
</script>
