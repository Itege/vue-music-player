<template>
	<div class="columns">
		<div v-for="(artist, ind) in albumArtists" class="card column col-1 col-md-3 col-sm-4 p-1" @click="selectArtist(artist)">
			<div class="card-body p-1">
				<img :src="'/images/' + getCover(albumsByArtist[artist])"/>
			</div>
			<div class="card-footer p-0 py-1">
				<button class="btn btn-sm">
					<span>{{artist}}</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	props: {
		tracklist: Array
	},
	computed: {
		albumArtists: function() {
			var artists = [];
			for (var i in this.tracklist) {
				if (this.tracklist[i].albumArtist == "" && artists.indexOf(this.tracklist[i].artist) === -1) {
					artists.push(this.tracklist[i].artist);
				} else if (this.tracklist[i].albumArtist != "" && artists.indexOf(this.tracklist[i].albumArtist) === -1) {
					artists.push(this.tracklist[i].albumArtist);
				}
			}
			artists.sort(function(a,b){
				return a.localeCompare(b);
			});
			return artists;
		},
		albumsByArtist: function() {
			var albums = {};
			for (var i in this.tracklist) {
				if (this.tracklist[i].albumArtist == "") {
					if (!albums[this.tracklist[i].artist]) {
						albums[this.tracklist[i].artist] = {};
					}
					if (!albums[this.tracklist[i].artist][this.tracklist[i].album]) {
						albums[this.tracklist[i].artist][this.tracklist[i].album] = {};
					}
					albums[this.tracklist[i].artist][this.tracklist[i].album]["cover"] = this.tracklist[i].cover;
				} else {
					if (!albums[this.tracklist[i].albumArtist]) {
						albums[this.tracklist[i].albumArtist] = {};
					}
					if (!albums[this.tracklist[i].albumArtist][this.tracklist[i].album]) {
						albums[this.tracklist[i].albumArtist][this.tracklist[i].album] = {};
					}
					albums[this.tracklist[i].albumArtist][this.tracklist[i].album]["cover"] = this.tracklist[i].cover;
				}
			}
			return albums;
		}
	},
	methods: {
		getCover: function(artist) {
			var keys = Object.keys(artist);
			return artist[keys[0]].cover;
		},
		selectArtist: function(artist) {
			this.$emit('select-artist',artist);
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