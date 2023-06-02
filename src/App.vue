<template>
  <div style="display:flex; flex-direction:row; position: relative">
    <SideMenu ref="sideMenu" :categories="$store.state.categories" :options="$store.state.options"
    :products="$store.state.products"/>
    <div v-if="$store.getters.getProducts.length == 0" style="margin: 30px 0; margin-left: calc(12vw + 60px); width: 95%;">
      <p style="font-size: calc(15px + 8 * (100vw - 320px) / 880);">Товаров по заданным критериям не найдено :(</p>
    </div>
    <div class="products-grid" v-if="$store.getters.getProducts.length > 0">
      <ProductCard v-for="product in $store.getters.getProducts" :key="product.id" :product_data="product"/>
    </div>
</div>
</template>

<script lang="ts">
import ProductCard from '@/components/ProductCard.vue';
import SideMenu from '@/components/SideMenu.vue';
import ProductPopup from '@/components/ProductPopup.vue';
import FavouritesPopup from '@/components/FavouritesPopup.vue';
import {onMounted} from 'vue';
import store from '@/store';

export default {
  components: {
    ProductCard,
    SideMenu,
    ProductPopup,
    FavouritesPopup
  },

  watch: {
  'store.state.allProducts': {
    handler: function() {
      store.dispatch('update')
    },
    deep: true
  }
},

  setup() {
    onMounted(async () => {
      // localStorage.removeItem('cart')
      // localStorage.removeItem('favourites')
      await fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>store.state.allProducts = json)

      if (localStorage.getItem('favourites') == undefined) {
          localStorage.setItem("favourites", JSON.stringify(store.getters.getFavourites.map(e => e.id)))
        } else {
          store.state.allProducts.map(e => e.isFav = JSON.parse(localStorage.getItem('favourites')).includes(e.id))
        }
        
        if (localStorage.getItem('cart') == undefined) {
          localStorage.setItem("cart", JSON.stringify(store.getters.getCart.map(e => ({id: e.id, amount: e.amount}))))
        } else {
          store.state.allProducts.map(e => {
            e.isInCart = JSON.parse(localStorage.getItem('cart')).some(x => x.id == e.id)
            if (e.isInCart) {
              e.amount = JSON.parse(localStorage.getItem('cart'))[JSON.parse(localStorage.getItem('cart'))
              .findIndex(x => x.id == e.id)].amount
            }
        })
        }

      store.state.products = JSON.parse(JSON.stringify(store.state.allProducts))

      await fetch('https://fakestoreapi.com/products/categories')
        .then(res=>res.json())
        .then(json=>store.state.categories = json);
    })
  },

  
}
</script>

<style>
@import "./assets/style.css";
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@200;300;400;600&display=swap');

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 0px;
  margin: 0px;
}

.block {
  background-color: red;
}

#app * {
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
}

body  {
  padding: 0 !important;
  margin: 0 !important;
}

.products-grid {
  margin: 20px;
  margin-left: calc(12vw + 60px);
  width: 95%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 11vw);
  justify-content: space-between;
  gap:1vw;
  justify-items: center;
  align-items: center;
}

</style>
