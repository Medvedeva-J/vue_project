import { IProduct } from '@/interfaces/product'
import { createStore, storeKey } from 'vuex'

export default createStore({
  state: {
    options: [
        {name: 'По возрастанию цены', value: 'asc'}, 
        {name: 'По убыванию цены', value: 'desc'}, 
        {name: 'По алфавиту', value: 'abc'}
      ],

    allProducts: [] as IProduct[],
    categories: [] as IProduct[],
    products: [] as IProduct[],

    category: '',
    sorting: '',

    favsVisible: false,
    cartVisible: false,

    showFavs: false
  },

  getters: {
    getAllProducts(state) {
      return state.allProducts
    },

    getCategories(state) {
      return state.categories
    },

    getOptions(state) {
      return state.options
    },

    getProducts(state) {
      return state.products
    },

    getCart(state) {
      return state.allProducts.filter(e => e.isInCart)
    },

    getFavourites(state) {
      return state.allProducts.filter(e => e.isFav)
    }
  },

  mutations: {
    toggleFav(state, {id, getters, dispatch}) {
      for (const el of state.allProducts) {
        if (el.id == id) {
          el.isFav = !el.isFav
        }
      }

      dispatch('update')

      localStorage.setItem("favourites", JSON.stringify(getters.getFavourites.map(e => e.id)))
    },

    async toggleCart(state, {id, getters, dispatch}) {
      for (const el of state.allProducts) {
        if (el.id == id) {
          el.isInCart = !el.isInCart
          if (!el.isInCart) {el.amount = 1}
        }
      }
      await dispatch('update')

      localStorage.setItem("cart", JSON.stringify(getters.getCart.map(e => ({id: e.id, amount: e.amount}))))
    },

    async update(state) {
      var list = JSON.parse(JSON.stringify(state.allProducts))
      if (state.category != '') {
          list = list.filter(e => e.category == state.category)
      }

      if (state.showFavs) {
        list = list.filter(e => e.isFav == true)
      }
        
         //сортировка товаров по заданному параметру
      switch (state.sorting) {
        case 'asc':
          list.sort((a,b) => a.price - b.price)
          break;
        case 'desc':
          list.sort((a,b) => b.price - a.price);
          break;
        case 'abc':
          list.sort((a,b) => a.title.localeCompare(b.title));
          break;
      }
      state.products = list
    },

    togglePopup(state, display) {
      if (display == 'избранных товаров') {
        state.favsVisible = !state.favsVisible
      } else {
        state.cartVisible = !state.cartVisible
      }
    },

    setAmount(state, {payload, getters, dispatch}) {
      state.allProducts.map(e => {if (e.id == payload.id) {e.amount = payload.amount}})
      dispatch('update')
      localStorage.setItem("cart", JSON.stringify(getters.getCart.map(e => ({id: e.id, amount: e.amount}))))
    }
  },

  actions: {
    toggleFav({commit, getters, dispatch}, id) {
      commit('toggleFav', {id, getters, dispatch})
    },

    toggleCart({commit, getters, dispatch}, id) {
      commit('toggleCart', {id, getters, dispatch})
    },

    setProducts({ commit }, newValue) {
      commit("setProducts", newValue);
    },

    setFlags({commit}) {
      commit('setFlags')
    },

    update({ commit }) {
      commit("update");
    },

    togglePopup({commit}, display) {
      commit('togglePopup', display)
    },

    setAmount({commit, getters, dispatch}, payload) {
      commit('setAmount', {payload, getters, dispatch})
    },
  },

  modules: {
  }
})
