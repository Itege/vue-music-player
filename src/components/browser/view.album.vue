<template>
	<div class="columns">
		<div v-for="(album, ind) in sortedAlbumKeys" v-show="showAlbum(albums[album])" class="card column col-1 col-md-3 col-sm-4 p-1" @click="selectAlbum(album)">
			<div class="card-body p-1">
				<img :src="'/images/' + albums[album].cover"/>
			</div>
			<div class="card-footer p-0 py-1">
				<button class="btn btn-sm">
					<span>{{albums[album].name}}</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	props: {
		tracklist: Array,
		selectedArtist: String
	},
	computed: {
		albums: function() {
			var albums = {};
			for (var i in this.tracklist) {
				if (!albums[this.tracklist[i].album]) {
					albums[this.tracklist[i].album] = {name: this.tracklist[i].album, cover: this.tracklist[i].cover, songs: []};
				}
				albums[this.tracklist[i].album].songs.push(i);

			}
			return albums;
		},
		sortedAlbumKeys: function() {
			return Object.keys(this.albums).sort(function(a, b) {
				return a.localeCompare(b);
			});
		}
	},
	methods: {
		showAlbum: function(album) {
			if (this.selectedArtist != "") {
				for(var i in album.songs) {
					if (this.selectedArtist == this.tracklist[album.songs[i]].artist || this.selectedArtist == this.tracklist[album.songs[i]].albumArtist) {
						return true;
					}
				}
				return false;
			}
			return true;
		},
		selectAlbum: function(album) {
			this.$emit("select-album", album);
		}
	}
}
</script>
<style scoped>
	.card .card-body img {
		width:100%;
		white-space: nowrap;
	}
	.card .card-footer .btn {
		width:100%;
		white-space: nowrap;
		overflow: hidden;
	}
	.card .card-footer .btn span {
		transition: margin 5s linear;
	}
	.card .card-footer .btn:hover span {
		margin-left: -100%;
	}
</style>