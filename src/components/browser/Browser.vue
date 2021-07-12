<template>
	<div class="flex-grow md:w-11/12 w-full mx-auto flex flex-col">
		<div
			class="mx-8 py-1 border-b flex flex-row justify-around text-center"
		>
			<a
				class="tab"
				:class="{ active: tab === 'artists' }"
				@click="changeTab('artists')"
			>
				<span>Artists</span>
				<div class="filter" v-text="selectedArtist" />
			</a>
			<a
				class="tab"
				:class="{ active: tab === 'albums' }"
				@click="changeTab('albums')"
			><span>Albums</span>
				<div
					class="filter"
					v-text="selectedAlbum + ' '"
				/></a>
			<a
				class="tab"
				:class="{ active: tab === 'songs' }"
				@click="changeTab('songs')"
			>Songs</a>
		</div>
		<div class="relative flex-grow overflow-auto">
			<div class="absolute inset-1 md:px-12 px-4 md:py-4 py-2">
				<div
					v-show="tab === 'artists'"
					class="grid grid-cols-2 md:grid-cols-5 3xl:grid-cols-7 gap-4 pb-20"
				>
					<artist
						v-for="artist in artists"
						:key="artist.name"
						:artist="artist"
						@dblclick="selectArtist(artist.name)"
					/>
				</div>
				<div
					v-show="tab === 'albums'"
					class="grid 3xl:grid-cols-7 md:grid-cols-5 grid-cols-2 gap-4 pb-20"
				>
					<card
						v-for="album in filteredAlbums"
						:key="album.name"
						:data="album"
						@dblclick="selectAlbum(album.name)"
					/>
				</div>
				<tracks v-show="tab === 'songs'" :tracks="filteredSongs" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Artist from "@/components/browser/Artist.vue";
import Card from "@/components/browser/Card.vue";
import Tracks from "./Tracks.vue";
import trackStore from "@/TrackStore";
import * as types from "@/Types";

export default defineComponent({
	name: "Browser",
	components: {
		Artist,
		Card,
		Tracks,
	},
	data() {
		return {
			tracklist: trackStore.tracklist,
			tab: "artists",
			selectedArtist: "",
			selectedAlbum: "",
			artists: trackStore.artists,
			albums: trackStore.albums,
		};
	},
	computed: {
		filteredAlbums(): Record<string, types.Album> {
			if (!this.selectedArtist) {
				return this.albums;
			}
			let albums: Record<string, types.Album> = {};
			for (let album of this.artists[this.selectedArtist].albums) {
				albums[album] = this.albums[album];
			}
			return albums;
		},
		filteredSongs(): types.Song[] {
			if (!this.selectedAlbum) {
				if (!this.selectedArtist) {
					return this.tracklist;
				}
				return this.artists[this.selectedArtist].songs.map((s) => {
					let track = this.tracklist[s];
					track.idx = s;
					return track;
				});
			}
			return this.albums[this.selectedAlbum]
				.songs.map((s) => {
					let track = this.tracklist[s];
					track.idx = s;
					return track;
				})
				.filter(
					(s) =>
						!this.selectedArtist ||
						s.albumArtist === this.selectedArtist ||
						s.artist === this.selectedArtist
				);
		},
	},
	methods: {
		selectArtist(artistName: string) {
			this.selectedArtist = artistName;
			this.changeTab("albums");
		},
		selectAlbum(albumName: string) {
			this.selectedAlbum = albumName;
			this.changeTab("songs");
		},
		changeTab(tabName: string) {
			switch (tabName) {
				case "artists":
					this.selectedArtist = "";
					this.selectedAlbum = "";
					break;
				case "albums":
					this.selectedAlbum = "";
					break;
				default:
			}
			this.tab = tabName;
		},
	},
});
</script>

<style lang="postcss" scoped>
.tab {
	@apply p-2;
	@apply cursor-pointer;
	@apply flex-grow;
	@apply rounded-md;
	@apply flex flex-col;
	@apply justify-center;
	@apply h-12;
}

.tab .filter {
	@apply text-xs;
	@apply text-gray-500;
}

.tab.active {
	@apply bg-green-500;
	@apply text-white;
}

.tab.active .filter {
	@apply text-gray-200;
}
</style>