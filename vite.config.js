import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
	plugins: [vue()],
	server: {
		proxy: {
			"^/(tracklist|images|audio).*": {
				target: "https://music.t3gs.ninja",
				changeOrigin: true,
			},
		}
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});