import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

// library fixed
import router from './router';
import { createPinia } from 'pinia'


let app;
app = createApp(App);


// calling library fixed
app.use(router);
app.use(createPinia())



//execute
app.mount('#app');

