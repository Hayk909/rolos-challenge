import '@/assets/main.scss';

import { createApp } from 'vue'
import { registerSW } from 'virtual:pwa-register';

import router from '@/router';
import App from '@/App.vue';

createApp(App).use(router).mount('#app')
registerSW();
