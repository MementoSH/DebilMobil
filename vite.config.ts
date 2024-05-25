import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs';
import path from "path";


export default defineConfig({
	plugins: [sveltekit()],
	server: {
		https: {
			key: fs.readFileSync(path.resolve('certs/key.pem')),
			cert: fs.readFileSync(path.resolve('certs/cert.pem')),
		},
		port: 5173,
		proxy: {
			'/api': {
			  target: 'https://82.147.71.252:8000',
			  changeOrigin: true,
			  secure: false,
			  rewrite: (path) => path.replace(/^\/api/, '')
			}
		  }
	}
});
