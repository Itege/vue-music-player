<template>
	<div class="container transport-controller p-1 m-0">
		<div class="playlist" v-show="showPlaylist">
			<div class="column">
				<table class="table">
					<tbody>
						<tr v-for="(song, idx) in playlist" @contextmenu.prevent="removeFromPlaylist(idx)">
							<td></td>
							<td><img :src="'/images/' + tracklist[song].cover"/></td>
							<td>{{tracklist[song].songname}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<progress class="progress pr-1" :value="currentTime" :max="duration" @click="updateProgress($event)"></progress>
		<div class="columns">
			<div class="wrapper column">
				<div class="song-info-container p-0" v-if="playlist.length > 0">
					<div class="cover mr-1">
						<img class="pr-1" :src="'/images/' + tracklist[playlist[currentIndex]].cover"/>
					</div>
					<div class="song-info">
						<strong>{{tracklist[playlist[currentIndex]].songname}}</strong>
						<br/>
						<small class="text-gray">{{tracklist[playlist[currentIndex]].artist}}</small>
						<br/>
						<small class="text-gray">{{tracklist[playlist[currentIndex]].album}}</small>
					</div>
				</div>
			</div>
			<div class="column text-center">
				<button class="btn btn-link"><i class="icon icon-refresh"></i></button>
				<button class="btn"><i class="icon icon-arrow-left"></i></button>
				<button class="btn btn-primary" @click="togglePlayback()"><i class="icon icon-forward"></i></button>
				<button class="btn"><i class="icon icon-arrow-right"></i></button>
				<button class="btn btn-link"><i class="icon icon-cross"></i></button>
			</div>
			<div class="column text-right">
				<button class="btn" @click="showPlaylist = !showPlaylist"><i class="icon icon-menu"></i></button>
			</div>
		</div>
		<template v-if="playlist.length > 0">
		<audio @timeupdate="currentTime=$event.target.currentTime, duration=$event.target.duration" ref="song" :src="'/audio/' + tracklist[playlist[currentIndex]].filename"></audio>
		<audio ref="preload" :src="'/audio/' + tracklist[playlist[nextIndex]].filename"></audio>
		</template>
	</div>
</template>

<script>
export default {
	props: {
		tracklist: Array,
		playlist: Array
	},
	data: function() {
		return {
			currentIndex: 0,
			currentTime: 0,
			duration: 0,
			showPlaylist: false
		}
	},
	computed: {
		nextIndex: function() {
			if (this.currentIndex + 1 >= this.playlist.length) {
				return 0;
			}
			return ++ this.currentIndex;
		}
	},
	methods: {
		togglePlayback: function() {
			if (!this.$refs.song.paused) {
				this.$refs.song.pause();
			} else {
				this.$refs.song.play();
			}
		},
		updateProgress: function(event){
			this.$refs.song.currentTime = (event.layerX / event.target.offsetWidth * this.$refs.song.duration);
		},
		removeFromPlaylist: function(idx) {
			this.$emit("remove-from-playlist", idx);
		}
	},
	watch: {
		tracklist: function() {
			//this.changeAudioSource();
		}
	},
	mounted: function() {
		if(window.AudioContext) {
			new window.AudioContext().resume();
		}
	}
}
</script>
<style scoped>
	progress {
		cursor: pointer;
	}
	.transport-controller {
		height: 80px;
		max-height: 80px;
		position: absolute;
		left: 0px;
		bottom: 0px;
		background: white;
	}
	.transport-controller div.cover {
		width: 75px;
		position: relative;
		float: left;
	}
	.transport-controller img {
		width: 75px;
	}
	div.song-info {
		white-space: nowrap;
		overflow: hidden;
		height: 100%;
	}
	div.song-info-container {
		height: 90%;
		float: left;
	}
	progress.progress {
		position: relative;
		top: -15px;
		border-radius: 0px;
	}
	.wrapper {
		position: relative;
		top: -21px;
		height: 100%;
	}
	.playlist {
		position: absolute;
		right: 0px;
		bottom: 80px;
		height: 500px;
		width: 500px;
		z-index: 10;
		background: white;
	}
</style>