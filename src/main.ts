import {createApp} from 'vue';
import App from './App.vue';
import "./assets/index.pcss";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import {TransportController} from '@/ApplicationState';
import configureMediaSession from "@/ConfigureMediaSession";

const setVolume = (offset: number): void => {
	let volume: number = parseFloat(TransportController.volume.value.toFixed(1));
	volume += offset;
	volume = (volume < 0 ? 0 : (volume > 1 ? 1 : volume));
	TransportController.setVolume(volume);
};

window.document.addEventListener("keydown", (e: KeyboardEvent) => {
	switch (e.key) {
		case " ":
			TransportController.playPause();
			break;
		case "ArrowRight":
			TransportController.nextSong();
			break;
		case "ArrowLeft":
			TransportController.prevSong();
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