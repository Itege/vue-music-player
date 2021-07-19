<template>
	<div class="flex flex-col h-screen select-none overflow-hidden" @keyup.space="playPause">
		<nav class="p-5 text-white font-bold text-lg bg-gradient-to-r from-green-500 via-green-800 to-gray-700">Chunes</nav>
		<browser />
		<transport />
	</div>
</template>

<script lang="ts">
import Browser from "@/components/browser/Browser.vue";
import Transport from "@/components/transport/Transport.vue";

export default {
	name: "App",
	components: {
		Browser,
		Transport,
	},
};
</script>