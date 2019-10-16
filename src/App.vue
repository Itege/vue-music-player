<template>
  <div id="app">
    <music-browser :tracklist="tracklist"/>
	<transport-controller :tracklist="tracklist" ref="transport" :playlist="playlist" @remove-from-playlist="removeFromPlaylist"></transport-controller>
  </div>
</template>

<script>
import musicBrowser from './components/browser/music.browser.vue';
import TransportController from "./components/transport/transport.controller.vue";

export default {
	name: 'app',
	data: function() {
		return {
			tracklist: [],
			playlist: [244]
		}
	},
	components: {
		musicBrowser, TransportController
	},
	methods: {
		handleHotKeys: function(event) {
			if (event.which == 32) {
				this.$refs.transport.togglePlayback();
			}
		},
		removeFromPlaylist: function(idx) {
			if (this.currentIndex == idx) {
				this.currentIndex = 0;
			}
			this.playlist.splice(idx, 1);
		}
	},
	mounted: function() {
		var thisObj = this;
		window.addEventListener("keydown", this.handleHotKeys);
		fetch("tracklist.json").then(function(resp){
			return resp.json();
		}).then(function(json) {
			thisObj.tracklist = json;
		});
	}
}
</script>
<style>
	body, html {
		padding: 0;
		margin: 0;
		overflow: hidden;
	}
	#app {
		height: 100vh;
	}
</style>