import {createApp} from 'vue';
import App from './App.vue';
import "./assets/index.pcss";
import "@fortawesome/fontawesome-free/css/all.css";
import TransportState from './TransportState';

window.document.addEventListener("keydown", (e: KeyboardEvent) => {
	if (e.key === " ") {
		TransportState.playPause();
	}
});

createApp(App).mount('#app');