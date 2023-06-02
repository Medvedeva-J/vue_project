<template>
    <div class="fav-card" @click="showPopupInfo">
      <div class="image-holder">
        <img :src="product_data.image">
      </div>
      <div class="product-info-fav">
          <p class="product-name-fav">{{product_data.title}}</p>
          <div style="display: flex; flex-direction: row;">
            <p style="font-weight:bolder; padding-right:10px">{{product_data.price}} $</p>
            
            <button class="like-btn small-btn" @click="toggleFav">
              <svg v-if="product_data.isFav" width="24px" height="24px" viewBox="0 0 0.45 0.45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.121 0.03a0.121 0.121 0 0 0 -0.086 0.207l0.179 0.179a0.015 0.015 0 0 0 0.021 0l0.179 -0.179a0.121 0.121 0 0 0 -0.171 -0.171l-0.018 0.018 -0.018 -0.018A0.121 0.121 0 0 0 0.121 0.03Z" fill="crimson"/></svg>
              <svg v-if="!product_data.isFav" width="24px" height="24px" viewBox="0 0 0.45 0.45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m0.225 0.405 -0.011 0.011a0.015 0.015 0 0 0 0.021 0L0.225 0.405ZM0.046 0.226l-0.011 0.011 0.011 -0.011Zm0.15 -0.15 -0.011 0.011 0.011 -0.011ZM0.225 0.105l-0.011 0.011a0.015 0.015 0 0 0 0.021 0L0.225 0.105Zm0.029 -0.029 -0.011 -0.011 0.011 0.011Zm-0.018 0.318L0.057 0.215l-0.021 0.021 0.179 0.179 0.021 -0.021Zm0.158 -0.179 -0.179 0.179 0.021 0.021 0.179 -0.179 -0.021 -0.021ZM0.185 0.087l0.029 0.029 0.021 -0.021 -0.029 -0.029 -0.021 0.021Zm0.05 0.029 0.029 -0.029 -0.021 -0.021 -0.029 0.029 0.021 0.021ZM0.329 0.03c-0.032 0 -0.063 0.013 -0.086 0.035l0.021 0.021C0.282 0.07 0.305 0.06 0.329 0.06V0.03ZM0.42 0.151c0 0.024 -0.01 0.047 -0.027 0.064l0.021 0.021A0.121 0.121 0 0 0 0.45 0.151h-0.03Zm0.03 0A0.121 0.121 0 0 0 0.329 0.03v0.03A0.091 0.091 0 0 1 0.42 0.151h0.03ZM0.121 0.06c0.024 0 0.047 0.01 0.064 0.027l0.021 -0.021A0.121 0.121 0 0 0 0.121 0.03v0.03ZM0.03 0.151A0.091 0.091 0 0 1 0.121 0.06V0.03A0.121 0.121 0 0 0 0 0.151h0.03Zm0.027 0.064A0.091 0.091 0 0 1 0.03 0.151H0c0 0.032 0.013 0.063 0.035 0.086l0.021 -0.021Z" fill="#000000"/></svg>
            </button>
            <button class="cart-btn small-btn" @click="toggleCart">
              <svg v-if="this.product_data.isInCart" width="24px" height="24px" viewBox="0 0 0.45 0.45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.029 0.011 0.001 0.019 0.094 0.33H0.45V0.135A0.075 0.075 0 0 0 0.375 0.06H0.044L0.029 0.011Z" fill="#000000"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0.165 0.36a0.045 0.045 0 1 0 0 0.09 0.045 0.045 0 0 0 0 -0.09ZM0.15 0.405a0.015 0.015 0 1 1 0.03 0 0.015 0.015 0 0 1 -0.03 0Z" fill="#000000"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0.375 0.36a0.045 0.045 0 1 0 0 0.09 0.045 0.045 0 0 0 0 -0.09Zm-0.015 0.045a0.015 0.015 0 1 1 0.03 0 0.015 0.015 0 0 1 -0.03 0Z" fill="#000000"/></svg>
              <svg v-if="!this.product_data.isInCart" width="24px" height="24px" viewBox="0 0 0.45 0.45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m0.015 0.015 0.018 0.06m0 0 0.072 0.24h0.33v-0.18a0.06 0.06 0 0 0 -0.06 -0.06H0.033Zm0.342 0.36a0.03 0.03 0 1 1 0 -0.06 0.03 0.03 0 0 1 0 0.06Zm-0.24 -0.03a0.03 0.03 0 1 1 0.06 0 0.03 0.03 0 0 1 -0.06 0Z" stroke="#000000" stroke-width="0.03"/></svg>
            </button>
            <AmountChecker v-if="this.product_data.isInCart" style="margin-left:10px" :amount="product_data.amount"></AmountChecker>
          </div>
      </div>
    </div>
</template>

<script>
import ProductPopup from '@/components/ProductPopup.vue';
import AmountChecker from '@/components/AmountChecker.vue';

export default {
  props: {
    product_data: Object
  },

  components: {
    ProductPopup,
    AmountChecker
  },

  methods: {
    toggleFav() {
      this.$emit('toggleFav', this.product_data.id)
    },

    toggleCart() {
      this.$emit('toggleCart', this.product_data.id)
    },
  },

  data() {
    return {
      products: [],
      popupVisible: false,
  }
}
}
</script>

<style>
@import "@/assets/style.css";
.fav-card {
  position: relative;
  width: 90%;
  height: 20%;
  margin: 10px 0;
  padding: 10px;
  margin: 20px auto;
  display: flex;
  flex-direction: row;
  border-radius: 12px;
  -webkit-box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.3);
}

.image-holder {
  position: relative;
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-holder img {
  position: relative;
  max-width: 100%;
  max-height: 100%;
}

.product-info-fav {
  position: relative;
  width: 80%;
  margin-left: 1vw;
  margin-top: 10px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-info-fav p {
  margin: 0;
  font-size:calc(10px + 8 * (100vw - 320px) / 880);
}

.product-name-fav {
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  width: auto;
}
</style>