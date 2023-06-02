import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import '@/assets/style.css';

let app = createApp(App);
app.provide("$store", store);
app.use(store);
app.mount("#app");

export type product = {
    id: number,
    title:string,
    price:number,
    category:string,
    description:string,
    image:string,
    isFav:boolean,
    isInCart:boolean,
}