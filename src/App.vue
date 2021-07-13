<template>
	<div class="flex flex-col h-screen select-none overflow-hidden" @keyup.space="playPause">
		<nav class="bg-gray-700 p-5 text-green-500 font-bold text-lg">Chunes</nav>
		<browser />
		<transport />
	</div>
</template>

<script lang="ts">
import Browser from "@/components/browser/Browser.vue";
import Transport from "@/components/transport/Transport.vue";
import {startWatcher as startStorageWatcher} from "@/StorageManager";

export default {
	name: "App",
	components: {
		Browser,
		Transport,
	},
	mounted(): void {
		startStorageWatcher();
	},
};
</script>