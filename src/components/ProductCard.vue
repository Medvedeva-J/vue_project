<template>
    <div class="product-card" @click="showPopupInfo">
      <img class="image" :src="product_data.image">
      <div class="product-info">
          <div class="product-name">{{product_data.title}}</div>
          <div style="font-weight:bolder">{{product_data.price}} $</div>
      </div>
    </div>
    <ProductPopup style="z-index: 11;" v-if="popupVisible" :product="product_data"
     @toggleFav="toggleFav" @toggleCart="toggleCart" @closePopupInfo="closePopupInfo"></ProductPopup>
</template>

<script>
import ProductPopup from '@/components/ProductPopup.vue';
export default {
  props: {
    product_data: Object
  },

  components: {
    ProductPopup
  },


  methods: {
    //открыть карточку товара
    showPopupInfo() {
      this.popupVisible = true
    },

    //закрыть карточку товара
    closePopupInfo() {
      this.popupVisible = false
      this.$parent.updateFavs()
    },

    toggleFav(id) {
      this.$emit('toggleFav', id)
    },

    toggleCart(id) {
      this.$emit('toggleCart', id)
    }
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
.product-card {
  position: relative;
  width: 80%;
  height: 80%;
  margin: 10px 0;
  padding: 10px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 12px;
  -webkit-box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.3);
}

.product-card:hover {
  -webkit-box-shadow: 0px 5px 10px 2px rgba(116, 187, 10, 0.414);
  -moz-box-shadow: 0px 5px 10px 2px rgba(116, 187, 10, 0.414);
  box-shadow: 0px 5px 10px 2px rgba(116, 187, 10, 0.414);
  transform: scale(1.1);
  transition: 0.2s;
}

.image {
    display: block;
    margin: auto 0;
    position: relative;
    max-width: 80%;
    max-height: 50%;
}

.product-info {
  position: relative;
  bottom: 0;
  margin: 0px;
  padding: auto;
  width: 100%;
}

.product-info * {
  text-align: center;
}

.product-name {
  font-size:calc(8px + 8 * (100vw - 320px) / 880);
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>