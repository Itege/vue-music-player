<template>
	<div class="columns">
		<table class="table table-compact column col-12">
			<thead>
				<tr>
					<th width="10%"></th>
					<th width="30%" >Name</th>
					<th width="30%">Artist</th>
					<th width="30%">Album</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(song, ind) in sortedSongs" v-show="showSong(song)">
					<td></td>
					<td class="song-info"><span>{{song.songname}}</span></td>
					<td class="song-info"><span>{{song.artist}}</span></td>
					<td class="song-info"><span>{{song.album}}</span></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>

export default {
	props: {
		tracklist: Array,
		selectedArtist: String,
		selectedAlbum: String
	},
	computed: {
		sortedSongs: function() {
			return this.tracklist.sort(function(a, b) {
				return a.songname.localeCompare(b.songname);
			});
		}
	},
	methods: {
		showSong: function(song) {
			if (this.selectedArtist != "" || this.selectedAlbum != "") {
				if (this.selectedArtist != "" && this.selectedAlbum != "") {
					if((this.selectedArtist == song.albumArtist || this.selectedArtist == song.artist) && this.selectedAlbum == song.album) {
						return true;
					}
				} else if (this.selectedArtist != "" && ((this.selectedArtist == song.albumArtist || this.selectedArtist == song.artist)) || (this.selectedAlbum != "" && this.selectedAlbum == song.album)) {
					return true;
				}
				return false;
			}
			return true;
		}
	}
}
</script>
<style scoped>
	table.table.table-compact th, table.table.table-compact td {
		padding: .3rem .4rem;
	}
	table td {
		overflow: hidden;
		white-space: nowrap;
	}
	table td.song-info {
		max-width: 30vw;
	}
	table td.song-info span {
		transition: margin 5s linear, padding 5s linear;
	}
	table td.song-info span:hover {
		margin-left: -100%;
		padding-right: 100%;
	}
</style>