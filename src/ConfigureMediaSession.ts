import {nextTick, watch} from "@vue/runtime-core";
import ApplicationState from "@/ApplicationState";

export default ():void => {
	// eslint-disable-next-line
	// @ts-ignore
	const mediaSession = 'mediaSession' in navigator ? navigator.mediaSession : null;
	if (mediaSession !== null) {
		mediaSession.setActionHandler('play', () => {
			ApplicationState.callback(true);
		});
		mediaSession.setActionHandler('pause', () => {
			ApplicationState.callback(false);
		});
		//navigator.mediaSession.setActionHandler('seekto', function() {});
		mediaSession.setActionHandler('previoustrack',  () => {
			ApplicationState.prevSong();
		});
		mediaSession.setActionHandler('nexttrack', () => {
			ApplicationState.nextSong();
		});
	}
	nextTick(() => {
		watch(ApplicationState.currentTrack, 
			(t) => {
				const track = t;
				const artist = track.albumArtist || track.artist;
				window.document.title = track.songname + "-" + artist;
				if (mediaSession !== null) {
					// eslint-disable-next-line
					// @ts-ignore
					mediaSession.metadata = new MediaMetadata({
						title: track.songname,
						artist: artist,
						album: track.album,
						artwork: [
							{src: "images/" + track.cover,  type: 'image/png'},
						],
					});
				}
			});
	});
};