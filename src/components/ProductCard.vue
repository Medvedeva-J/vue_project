<template>
    <div class="product-card" >
        <img :src="product.image">
        <div class="product-info">
            <p class="product-name">{{product.title}}</p>
            <p style="font-weight: bolder; margin: 5px 0;">{{product.price}} $</p>
        </div>
    </div>
</template>

<script>
import ProductPopup from '@/components/ProductPopup.vue';
export default {
  props: {
    product: Object
  },
  
  mounted() {
    this.$el.addEventListener('click', this.onClick);
  },

  methods: {
    onClick() {
      let a = document.getElementById('app')
      let div = document.createElement('ProductPopup');
      // div.props.product = JSON.parse(this.product)
      a.appendChild(div);
    }
  },

  data() {
    return {
      products: [],
  }
}
}
</script>

<style>
.product-card {
  height: 25vh;
  margin: 10px 0;;
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

.product-card img {
    display: block;
    margin: auto 0;
    position: relative;
    max-width: 100%;
    max-height: 60%;
}

.product-info {
    position: relative;
    bottom: 0;
}

.product-info p {
    margin: 0;
    padding: 0;
}

.product-name {
  font-size: smaller;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.popup{
    width:100%;
    height: 2000px;
    background-color: rgba(0,0,0,0.5);
    overflow:hidden;
    position:fixed;
    top:0px;
}

.popup .popup-content{
    margin:40px auto 0px auto;
    width:100px;
    height: 40px;
    padding:10px;
    background-color: white;
    border-radius:5px;
    box-shadow: 0px 0px 10px #000;
}
</style>