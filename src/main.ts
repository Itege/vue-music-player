import {createApp} from 'vue';
import App from './App.vue';
import "./assets/index.pcss";
import "@fortawesome/fontawesome-free/css/all.css";
import ApplicationState from '@/ApplicationState';
import configureMediaSession from "@/ConfigureMediaSession";

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
		default:
	}
});
configureMediaSession();


createApp(App).mount('#app');