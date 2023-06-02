import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/style.css';

createApp(App).use(store).use(router).mount('#app')

export type product = {
    id: number,
    title:string,
    price:number,
    category:string,
    description:string,
    image:string
}