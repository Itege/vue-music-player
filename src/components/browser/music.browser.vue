<template>
	<div class="container browser">
		<ul class="tab">
			<li :class="['tab-item', {active: active == 0}]" @click="active = 0, selectedArtist=''">
				<a href="#">Artists</a>
			</li>
			<li :class="['tab-item', {active: active == 1}]" @click="active = 1, selectedAlbum=''">
				<a href="#">Albums</a>
			</li>
			<li :class="['tab-item', {active: active == 2}]" @click="active = 2">
				<a href="#">Songs</a>
			</li>
			<li class="" :class="['tab-item', {active: active == 3}]" @click="active = 3">
				<a href="#">Playlists</a>
			</li>
		</ul>
		<div v-if="selectedArtist != '' || selectedAlbum != ''" class="m-0 p-0">
			<div class="chip bg-primary" v-show="selectedArtist != ''"><span class="text">{{selectedArtist}}</span><span class="btn btn-clear" @click="selectedArtist=''"></span></div>
			<div class="chip" v-show="selectedAlbum != ''"><span class="text">{{selectedAlbum}}</span><span class="btn btn-clear" @click="selectedAlbum=''"></span></div>
		</div>
		<div v-else class="chip" style="background:white"></div>
		<content-controller @select-artist="setSelectedArtist"  @select-album="setSelectedAlbum" :selected-artist="selectedArtist" :selected-album="selectedAlbum" :tab="active" :tracklist="tracklist"></content-controller>
	</div>
</template>

<script>
import ContentController from "./content.controller.vue";
export default {
    data: function() {
		return {
			test: 'hello',
			active: 0,
			selectedArtist: "",
			selectedAlbum: ""
		}
	},
	props: {
		tracklist: Array
	},
	components: {
		ContentController
	},
	methods: {
		setSelectedArtist: function(artist) {
			this.selectedArtist = artist
			this.active = 1;
		},
		setSelectedAlbum: function(album) {
			this.selectedAlbum = album;
			this.active = 2;
		}
	}
}
</script>
<style scoped>
.browser {
	display: block;
	height: calc(100% - 80px);
	overflow: hidden;
}
.chip span.text {
	max-width: 120px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>