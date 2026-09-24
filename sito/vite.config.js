import { defineConfig } from 'vite';
import { resolve } from 'node:path';
export default defineConfig({base:process.env.SITE_BASE||'/',build:{rollupOptions:{input:{home:resolve('index.html'),trattamenti:resolve('trattamenti/index.html'),centro:resolve('il-centro/index.html'),contatti:resolve('contatti/index.html')}}},server:{port:4173,strictPort:true}});
