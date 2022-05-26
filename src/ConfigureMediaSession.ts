import {nextTick, watch} from "@vue/runtime-core";
import {TransportController} from "@/ApplicationState";

export default ():void => {
	// eslint-disable-next-line
	// @ts-ignore
	const mediaSession = 'mediaSession' in navigator ? navigator.mediaSession : null;
	if (mediaSession !== null) {
		mediaSession.setActionHandler('play', () => {
			TransportController.callback(true);
		});
		mediaSession.setActionHandler('pause', () => {
			TransportController.callback(false);
		});
		//navigator.mediaSession.setActionHandler('seekto', function() {});
		mediaSession.setActionHandler('previoustrack',  () => {
			TransportController.prevSong();
		});
		mediaSession.setActionHandler('nexttrack', () => {
			TransportController.nextSong();
		});
	}
	nextTick(() => {
		watch(TransportController.currentTrack, 
			(t) => {
				const track = t;
				const artist = track.albumArtist || track.artist;
				window.document.title = track.songname + "-" + artist;
				const icon: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
				if (icon !== null) {
					icon.href = "music/artwork/" + track.cover;
				}
				if (mediaSession !== null) {
					// eslint-disable-next-line
					// @ts-ignore
					mediaSession.metadata = new MediaMetadata({
						title: track.songname,
						artist: artist,
						album: track.album,
						artwork: [
							{src: "music/artwork/" + track.cover,  type: 'image/png'},
						],
					});
				}
			});
	});
};