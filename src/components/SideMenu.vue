<template>
    <div class="side-menu">
      <select id="categories-filter" class="select-css"> 
        <option value="all" hidden disabled selected>Выберите категорию</option>
        <option value="all">all</option>
        <option v-for="category in categories">{{ category }}</option>
      </select>
      <select id="sorting-filter" class="select-css"> 
        <option value="" hidden disabled selected>Отсортировать</option>
        <option v-for="option in options" :value="option.value">{{ option.name }}</option>
      </select>
      <button class="side-menu-btn" @click="this.$parent.update">Показать результаты</button>
    </div>
</template>

<script>
export default {
    props: {
        categories: [],
        options: [Object],
    },

    data() {
      return {
        category: '',
        sorting: ''
      }
    },

    methods: {
  }
}
</script>

<style>
.side-menu {
  height: 100%;
  width: 12vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  overflow-x: hidden;
  padding: 20px 10px;
  -webkit-box-shadow: 7px 0px 22px 6px rgba(0, 0, 0, 0.11);
-moz-box-shadow: 7px 0px 22px 6px rgba(0, 0, 0, 0.11);
box-shadow: 7px 0px 22px 6px rgba(0, 0, 0, 0.11);
}

.side-menu * {
  position: relative;
  border-radius: 10px;
  border: solid;
  border-width: 2px;

  width: 100%;
  padding: 5px;
  margin: 5px 0px;
}

.side-menu-btn {
  padding: 10px 0;
}

.side-menu-btn:hover {
  background-color: #b4f600;
  transition: 0.2s;
}
</style>