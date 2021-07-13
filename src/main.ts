import {createApp} from 'vue';
import App from './App.vue';
import "./assets/index.pcss";
import "@fortawesome/fontawesome-free/css/all.css";
import ApplicationState from '@/ApplicationState';

window.document.addEventListener("keydown", (e: KeyboardEvent) => {
	if (e.key === " ") {
		ApplicationState.playPause();
	}
});

createApp(App).mount('#app');