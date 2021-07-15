import {createApp} from 'vue';
import App from './App.vue';
import "./assets/index.pcss";
import "@fortawesome/fontawesome-free/css/all.css";
import ApplicationState from '@/ApplicationState';
import configureMediaSession from "@/ConfigureMediaSession";

const setVolume = (offset: number): void => {
	let volume: number = parseFloat(ApplicationState.volume.value.toFixed(1));
	volume += offset;
	volume = (volume < 0 ? 0 : (volume > 1 ? 1 : volume));
	ApplicationState.setVolume(volume);
};

window.document.addEventListener("keydown", (e: KeyboardEvent) => {
	switch (e.key) {
		case " ":
			ApplicationState.playPause();
			break;
		case "ArrowRight":
			ApplicationState.nextSong();
			break;
		case "ArrowLeft":
			ApplicationState.prevSong();
			break;
		case "ArrowUp":
			setVolume(.1);
			break;
		case "ArrowDown":
			setVolume(-.1);
			break;
		default:
	}
});
configureMediaSession();


createApp(App).mount('#app');