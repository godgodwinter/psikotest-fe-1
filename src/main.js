import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

// library fixed
import router from './router';
import { createPinia } from 'pinia'
import Datepicker from '@vuepic/vue-datepicker';
import { QuillEditor } from '@vueup/vue-quill'
import AOS from 'aos'
import VueGoodTablePlugin from 'vue-good-table-next';

// testing
import VueWriter from "vue-writer";

// style
import '@vuepic/vue-datepicker/dist/main.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import 'aos/dist/aos.css'
import 'vue-good-table-next/dist/vue-good-table-next.css'

let app;
app = createApp(App);


// calling library fixed
app.use(router);
app.use(createPinia())
app.component('Datepicker', Datepicker);
app.component('QuillEditor', QuillEditor)
app.use(AOS.init());
app.use(VueGoodTablePlugin)

// testing
app.use(VueWriter)



//execute
app.mount('#app');

