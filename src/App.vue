<template>
  <div style="display:flex; flex-direction:row; position: relative">
    <SideMenu :categories="categories" :options="options"/>
    <div class="products-grid">
      <ProductCard v-for="product in products" :key="product.id" :product="product" @click="showProductWindow"/>
    </div>
</div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import SideMenu from '@/components/SideMenu.vue';
import ProductPopup from '@/components/ProductPopup.vue';
export default {
  props: {
    product: Object
  },

  mounted: function () {
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>this.products = json)
    fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(json=>this.categories = json) 
  }, 

  components: {
    ProductCard,
    SideMenu
  },

  data() {
    return {
      products: [],
      categories: [],
      options: [
        {name: 'По возрастанию цены', value: 'asc'}, 
        {name: 'По убыванию цены', value: 'desc'}, 
        {name: 'По алфавиту', value: 'abc'}
      ]
  }
},

methods: {
  update() {
    var select = document.getElementById('categories-filter');
		var opt = select.options[select.selectedIndex];
    if (opt.value == 'all') {
      var category = ''
    } else {
      var category = '/category/' + opt.value
    }

    var select = document.getElementById('sorting-filter');
    var opt = select.options[select.selectedIndex];
    var sorting = opt.value

    fetch('https://fakestoreapi.com/products' + category)
      .then(res=>res.json())
      .then(json=>this.products = json)
    switch (sorting) {
      case 'asc':
        this.products.sort((a,b) => a.price - b.price)
        break;
      case 'desc':
        this.products.sort((a,b) => b.price - a.price)
        break;
      case 'abc':
        this.products.sort((a,b) => a.title.localeCompare(b.title))
        break;
    }
    console.log(this.products)
  },

  showProductWindow() {
    var select = document.getElementById('categories-filter')
    select.width = '10px'
  }
}
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@200;300;400;600&display=swap');
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
  gap:1vw
}

</style>
