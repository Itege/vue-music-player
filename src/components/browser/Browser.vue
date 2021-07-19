<template>
	<div class="flex-grow w-full flex flex-col bg-gradient-to-b from-white to-gray-50">
		<div class="flex-grow lg:w-11/12 w-full mx-auto flex flex-col">
			<div
				class="lg:mx-8 mx-1 py-1 border-b flex flex-row justify-around text-center"
			>
				<a
					class="tab artists"
					:class="{ active: tab === 'artists' }"
					@click="changeTab('artists')"
				>
					<span>Artists</span>
					<div class="filter" v-text="selectedArtist" />
				</a>
				<a
					class="tab albums"
					:class="{ active: tab === 'albums' }"
					@click="changeTab('albums')"
				><span>Albums</span>
					<div
						class="filter"
						v-text="selectedAlbum + ' '"
					/></a>
				<a
					class="tab songs"
					:class="{ active: tab === 'songs' }"
					@click="changeTab('songs')"
				>Songs</a>
			</div>
			<div class="relative flex-grow overflow-auto">
				<div class="absolute inset-1 lg:px-12 px-4 lg:py-4 py-2">
					<div
						v-show="tab === 'artists'"
						class="grid grid-cols-2 lg:grid-cols-5 3xl:grid-cols-7 gap-4 pb-20"
					>
						<artist
							v-for="(artist, key) in artists"
							:key="key"
							:artist="artist"
							@dblclick="selectArtist(key)"
						/>
					</div>
					<div
						v-show="tab === 'albums'"
						class="grid 3xl:grid-cols-7 lg:grid-cols-5 grid-cols-2 gap-4 pb-20"
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
	</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Artist from "@/components/browser/Artist.vue";
import Card from "@/components/browser/Card.vue";
import Tracks from "./Tracks.vue";
import ApplicationState from "@/ApplicationState";
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
			tracklist: ApplicationState.tracklist,
			tab: "artists",
			selectedArtist: "",
			selectedAlbum: "",
			artists: ApplicationState.artists,
			albums: ApplicationState.albums,
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
				return this.artists[this.selectedArtist].songs.map((s: number) => {
					let track = this.tracklist[s];
					track.idx = s;
					return track;
				});
			}
			return this.albums[this.selectedAlbum]
				.songs.map((s: number) => {
					let track = this.tracklist[s];
					track.idx = s;
					return track;
				})
				.filter(
					(s: types.Song) =>
						!this.selectedArtist ||
						s.albumArtist.toLowerCase() === this.selectedArtist ||
						s.artist.toLowerCase() === this.selectedArtist
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
	@apply lg:block;
	@apply hidden;
}

.tab.artists.active {
	@apply bg-green-500;
	@apply text-white;
}

.tab.albums.active {
	@apply bg-green-500;
	@apply bg-gradient-to-r;
	@apply from-green-500;
	@apply to-green-800;
	@apply text-white;
}

.tab.songs.active {
	@apply bg-gradient-to-r;
	@apply from-green-800;
	@apply to-gray-700;
	@apply text-white;
}

.tab.active .filter {
	@apply text-gray-200;
}
</style>