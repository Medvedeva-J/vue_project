<template>
    <div class="side-menu">
      <div>
        <select ref="categorySelect" v-model="$store.state.category" id="categories-filter" class="select-css"> 
          <option value="" disabled selected>Выберите категорию</option>
          <option value="">all</option>
          <option v-for="(category, index) in categories" :key="index">{{ category }}</option>
        </select>

        <select ref="sortingSelect" v-model="$store.state.sorting" id="sorting-filter" class="select-css"> 
          <option value="" disabled selected>Отсортировать</option>
          <option v-for="option in options" :value="option.value">{{ option.name }}</option>
        </select>

        <div style="display:flex; flex-direction:row; width:100%; align-content: center; margin: 10px 0;">
          <input type="checkbox" ref="favsCheckbox" @change="(event) => $store.state.showFavs = (event.target as HTMLInputElement).checked" id="fav" style="accent-color: #b4f600">
          <label for="fav">Показать избранные</label>
        </div>
        <button class="side-menu-btn border-btn" @click="$store.dispatch('update')">Показать результаты</button>
      </div>

      <div>
        <button class="bottom-side-btn borderless-btn" @click="$store.dispatch('togglePopup', 'избранных товаров')">
          <p style="font-size: larger;" v-text="$store.getters.getFavourites.length"></p>
          <svg width="24px" height="24px" viewBox="0 0 0.45 0.45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m0.225 0.405 -0.011 0.011a0.015 0.015 0 0 0 0.021 0L0.225 0.405ZM0.046 0.226l-0.011 0.011 0.011 -0.011Zm0.15 -0.15 -0.011 0.011 0.011 -0.011ZM0.225 0.105l-0.011 0.011a0.015 0.015 0 0 0 0.021 0L0.225 0.105Zm0.029 -0.029 -0.011 -0.011 0.011 0.011Zm-0.018 0.318L0.057 0.215l-0.021 0.021 0.179 0.179 0.021 -0.021Zm0.158 -0.179 -0.179 0.179 0.021 0.021 0.179 -0.179 -0.021 -0.021ZM0.185 0.087l0.029 0.029 0.021 -0.021 -0.029 -0.029 -0.021 0.021Zm0.05 0.029 0.029 -0.029 -0.021 -0.021 -0.029 0.029 0.021 0.021ZM0.329 0.03c-0.032 0 -0.063 0.013 -0.086 0.035l0.021 0.021C0.282 0.07 0.305 0.06 0.329 0.06V0.03ZM0.42 0.151c0 0.024 -0.01 0.047 -0.027 0.064l0.021 0.021A0.121 0.121 0 0 0 0.45 0.151h-0.03Zm0.03 0A0.121 0.121 0 0 0 0.329 0.03v0.03A0.091 0.091 0 0 1 0.42 0.151h0.03ZM0.121 0.06c0.024 0 0.047 0.01 0.064 0.027l0.021 -0.021A0.121 0.121 0 0 0 0.121 0.03v0.03ZM0.03 0.151A0.091 0.091 0 0 1 0.121 0.06V0.03A0.121 0.121 0 0 0 0 0.151h0.03Zm0.027 0.064A0.091 0.091 0 0 1 0.03 0.151H0c0 0.032 0.013 0.063 0.035 0.086l0.021 -0.021Z" fill="#000000"/></svg>
          <p>Избранное</p>
        </button>

        <button class="bottom-side-btn borderless-btn" @click="$store.dispatch('togglePopup', 'товаров в корзине')">
          <p style="font-size: larger;" v-text="$store.getters.getCart.length"></p>
          <svg width="24px" height="24px" viewBox="0 0 0.45 0.45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m0.015 0.015 0.018 0.06m0 0 0.072 0.24h0.33v-0.18a0.06 0.06 0 0 0 -0.06 -0.06H0.033Zm0.342 0.36a0.03 0.03 0 1 1 0 -0.06 0.03 0.03 0 0 1 0 0.06Zm-0.24 -0.03a0.03 0.03 0 1 1 0.06 0 0.03 0.03 0 0 1 -0.06 0Z" stroke="#000000" stroke-width="0.03"/></svg>
          <p>Корзина</p>
        </button>
      </div>
    </div>

    <FavouritesPopup style="z-index: 10;" v-if="$store.state.favsVisible" :products="$store.getters.getFavourites" :display="'избранных товаров'"></FavouritesPopup>
    <FavouritesPopup style="z-index: 10;" v-if="$store.state.cartVisible" :products="$store.getters.getCart" :display="'товаров в корзине'"></FavouritesPopup>
</template>

<script lang="ts">
import FavouritesPopup from '@/components/FavouritesPopup.vue';
import FavCard from '@/components/FavCard.vue';
import AmountChecker from '@/components/AmountChecker.vue';

export default {
  data() {
    return {
      favouritesVisible: false,
      cartVisible: false,
    }
  },

    props: {
        categories: [],
        options: [],
        products: [],
    },

    components: {
      FavouritesPopup, 
      FavCard,
      AmountChecker
    },
 }
</script>

<style>
@import "@/assets/style.css";

.side-menu {
  width: 12vw;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: white;
  padding: 20px 10px;
  -webkit-box-shadow: 7px 0px 22px 6px rgba(0, 0, 0, 0.11);
  -moz-box-shadow: 7px 0px 22px 6px rgba(0, 0, 0, 0.11);
  box-shadow: 7px 0px 22px 6px rgba(0, 0, 0, 0.11);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.side-menu select {
  position: relative;
  border-radius: 10px;
  border: solid;
  border-width: 2px;

  width: 100%;
  height: 2.5em;
  align-items: center;
  margin: 5px 0px;
  font-size:calc(3px + 8 * (100vw - 320px) / 880);
}

.side-menu-btn {
  margin: 10px;
}

.side-menu-btn:hover {
  background-color: #b4f600;
  transition: 0.2s;
}

.select-css {
  padding: 0.5em 0;
}
</style>