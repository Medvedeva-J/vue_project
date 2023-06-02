<template>
  <div style="display:flex; flex-direction:row; position: relative">
    <SideMenu ref="sideMenu" :categories="categories" :options="options" :products="allProducts" :cart="cart" :favourites="favourites"
    @update="update" @showFavs="showFavs"
    :favProducts="favProducts" @toggleFav="toggleFav"
    :cartProducts="cartProducts" @toggleCart="toggleCart"/>
    <div v-if="products.length == 0" style="margin: 30px 0; margin-left: calc(12vw + 60px); width: 95%;">
      <p style="font-size: calc(15px + 8 * (100vw - 320px) / 880);">Товаров по заданным критериям не найдено :(</p>
    </div>
    <div class="products-grid" v-if="products.length > 0">
      <ProductCard v-for="product in products" :key="product.id" :product_data="product"
      @toggleFav="toggleFav" @toggleCart="toggleCart"/>
    </div>
</div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import SideMenu from '@/components/SideMenu.vue';
import ProductPopup from '@/components/ProductPopup.vue';
import FavouritesPopup from '@/components/FavouritesPopup.vue';

export default {
  props: {
    product: Object,
  },

  data() {
    return {
      allProducts:[],    //список всех товаров, не изменяется
      products: [],     //список текущих товаров, отображаемых на странице. изменяется в зависимости от применённых фильтров
      categories: [],    //список категорий товаров
      options: [        //список вариантов сортировки
        {name: 'По возрастанию цены', value: 'asc'}, 
        {name: 'По убыванию цены', value: 'desc'}, 
        {name: 'По алфавиту', value: 'abc'}
      ],
      favourites: [],   //список с id избранных товаров (храню отдельно птмчт корректно сранивать объекты с несколькими полями у меня не получилось)
      favProducts: [],  //список объектов в избранном
      cart: [],
      cartProducts: []
  }
},

  async mounted() {
    //localStorage.removeItem('favourites')

    //Получение id избранных товаров из локального хранилища
    if (localStorage.getItem('favourites') == undefined) {
      localStorage.setItem("favourites", JSON.stringify(this.favourites))
    } else {
      this.favourites = JSON.parse(localStorage.getItem('favourites'))
    }
    if (localStorage.getItem('cart') == undefined) {
      localStorage.setItem("cart", JSON.stringify(this.cart))
    } else {
      this.cart = JSON.parse(localStorage.getItem('cart'))
    }

    //получение списка всех товаров
    await fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>this.allProducts = json)

    //получение списка продуктов для отображения на странице
    await fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>this.products = json)

    //получения списка категорий товаров
    await fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(json=>this.categories = json);

    //установка флагов isFav для всех товаров (находится ли товар в избранном)
    for(const element of this.allProducts) {element.isFav = this.favourites.includes(element.id)}

    for(const element of this.allProducts) {element.isInCart = this.cart.includes(element.id)}

    this.products = JSON.parse(JSON.stringify(this.allProducts))
    
    //получение списка объектов в избранном
    this.favProducts = this.allProducts.filter(element => element.isFav)

    this.cartProducts = this.allProducts.filter(element => element.isInCart)
  }, 

  components: {
    ProductCard,
    SideMenu,
    ProductPopup,
    FavouritesPopup
  },

  // filters: {
  //      favs: function(product) {
  //          if (product.isFav) {
  //           return product
  //          }
  //      }
  //   },

methods: {
  //обновление отображаемых товаров
  async update() {
    var category = this.$refs.sideMenu.$refs.categorySelect.options[this.$refs.sideMenu.$refs.categorySelect.options.selectedIndex].value
    var sorting = this.$refs.sideMenu.$refs.sortingSelect.options[this.$refs.sideMenu.$refs.sortingSelect.options.selectedIndex].value
    if (category != '') {
        category = '/category/' + category
      }

    //отображение текущих товаров в искомой категории
    await fetch('https://fakestoreapi.com/products' + category)
          .then(res=>res.json())
          .then(json=>this.products = json)

    if (this.$refs.sideMenu.$refs.favsCheckbox.checked) {
      this.products = this.products.filter(e => this.favourites.includes(e.id))
    }
      

    //сортировка товаров по заданному параметру
      switch (sorting) {
        case 'asc':
          this.products.sort((a,b) => a.price - b.price)
          break;
        case 'desc':
          this.products.sort((a,b) => b.price - a.price);
          break;
        case 'abc':
          this.products.sort((a,b) => a.title.localeCompare(b.title));
          break;
        }

    

    //установка флагов isFav для всех отображаемых товаров (находится ли товар в избранном)
    this.products.map(element => 
    {if (this.favourites.includes(element.id)) element.isFav = true})

    this.products.map(element => 
    {if (this.cart.includes(element.id)) element.isInCart = true})
  },

  //изменение флага isFav для конкретного продукта
  toggleFav(id) {
    if (this.favourites.includes(id)) {
      this.favourites.splice(this.favourites.indexOf(id), 1);
    } else {
      this.favourites.push(id)
    }
    this.products.map(element => {if (element.id == id) element.isFav = !element.isFav})
    this.allProducts.map(element => {if (element.id == id) element.isFav = !element.isFav})
    localStorage.setItem("favourites", JSON.stringify(this.favourites));
    this.favProducts = this.allProducts.filter(element => element.isFav)
    this.update()
  },

  toggleCart(id) {
    if (this.cart.includes(id)) {
      this.cart.splice(this.cart.indexOf(id), 1);
    } else {
      this.cart.push(id)
    }
    this.products.map(element => {if (element.id == id) element.isInCart = !element.isInCart})
    this.allProducts.map(element => {if (element.id == id) element.isInCart = !element.isInCart})
    localStorage.setItem("cart", JSON.stringify(this.cart));
    this.cartProducts = this.allProducts.filter(element => element.isInCart)
  },

  updateFavs() {
    this.favProducts = this.products.filter(element => element.isFav)
  },

  updateCart() {
    this.cartProducts = this.products.filter(element => element.isInCart)
  },
}
}
</script>

<style>
@import "./assets/style.css";
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@200;300;400;600&display=swap');
@media screen and (max-width: 1024px) {
  .side-menu {
    display: none;
  }

  div.products-grid {
    margin: 20px auto;
    grid-template-columns: repeat(auto-fill, 22vw);
  }

  div.product-card {
    min-width: 16vw;
    margin: 20px;
  }

  div.product-card:hover {
  transform: scale(1.05);
  }

  .product-info p {
    font-size:calc(10px + 8 * (100vw - 320px) / 880);
  }
}

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
