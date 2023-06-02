<template>
    <div class="popup-fav">
        <div class="popup-content-fav">
            
            <div style="width: 100%; height: 100%;">
                <div style="width: 100%; height: 100%; display:flex; align-items: center;" v-if="products.length == 0">
                    <p style="margin: auto; font-size:calc(15px + 8 * (100vw - 320px) / 880);">У вас пока нет {{ display }} :(</p>
                </div>
                <div style="width:100%; height: 100%; display: flex; justify-content: stretch; flex-direction: column;"
                v-if="products.length > 0">
                    <div class="favs-grid">
                        <FavCard v-for="product in products" :key="product.id" :product_data="product"/>
                    </div>
                    
                    <div class="total" v-if="display=='товаров в корзине'">
                        <p>Итого: </p>
                        <p>{{ products.reduce((acc, item) => acc + item.price * item.amount, 0) }} $</p>
                    </div>
                </div>
            </div>
            
            <button class="close-btn small-btn" @click="$store.dispatch('togglePopup', display)">
                <svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/></svg>
            </button>

        </div>
    </div>
</template>

<script lang="ts">
import FavCard from '@/components/FavCard.vue';

export default {
    props: {
    product: Object,
    products: [],
    display: String
  },

  data(): Object {
    return {
      product: Object,
      current: [],
      totalSum: 0
  }
},

components: {
    FavCard
},
}
</script>

<style>
@import "@/assets/style.css";
.popup-fav {
    width:100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
    overflow:hidden;
    position:fixed;
    display: flex;
    align-items: center;
    top:0px;
    left:0px;
}

.popup-content-fav {
    min-width:60vw;
    width: fit-content;
    height: 85vh;
    background-color: white;
    border-radius:12px;
    box-shadow: 0px 0px 10px #000;
    margin: auto;

    display: flex;
    flex-direction: row;

    padding: 20px;
}

div.favs-grid {
    width: 95%;
    height: 90%;
    overflow-y: scroll;
    margin: 20px;
    grid-template-columns: repeat(auto-fill, 1vw);
}

.total {
    display: flex;
    margin: 0 20px;
    border: solid rgb(189, 189, 189);
    border-radius:12px;
}

.total p {
    margin-left: 20px;
    margin-right: 20px;
    font-weight: 900 !important;
    font-size:calc(20px + 8 * (100vw - 320px) / 880);
    
}
</style>