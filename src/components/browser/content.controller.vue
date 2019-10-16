<template>
	<div class="container browser-container">
		<artist-view v-show="tab === 0" :tracklist="tracklist" @select-artist="selectArtist"></artist-view>
		<album-view v-show="tab === 1" :tracklist="tracklist" :selected-artist="selectedArtist" @select-album="selectAlbum"></album-view>
		<song-view v-show="tab === 2" :tracklist="tracklist" :selected-artist="selectedArtist" :selected-album="selectedAlbum"></song-view>
	</div>
</template>

<script>
import ArtistView from "./view.artist.vue";
import AlbumView from "./view.album.vue";
import SongView from "./view.song.vue";
export default {
    props: {
		tab: Number,
		tracklist: Array,
		selectedArtist: String,
		selectedAlbum: String
    },
	data: function() {
		return {
		}
	},
    components: {
		ArtistView, AlbumView, SongView
    },
	methods: {
		selectArtist: function(artist) {
			this.$emit("select-artist", artist);
		},
		selectAlbum: function(album) {
			this.$emit("select-album", album);
		}
	}
}
</script>
<style scoped>
.browser-container {
	height: calc(100% - 76px);
	overflow: auto;
}
</style>