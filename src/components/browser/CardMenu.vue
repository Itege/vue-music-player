<template>
	<div class="absolute inset-0 bg-white z-10">
		<button class="w-full p-2 font-semibold hover:bg-gray-200 text-left" @click.stop="$emit('play')">Play now</button>
		<button class="w-full p-2 font-semibold hover:bg-gray-200 text-left" @click.stop="$emit('add')">Add to queue</button>
	</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
	name: "CardMenu",
	emits: ["play", "add"],
});
</script>
