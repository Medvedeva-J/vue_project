<template>
    <div class="amount-checker">
        <button class="minus-btn" @click="(event) => {if (product.amount - 1 > 0) 
            {product.amount -= 1
            $store.dispatch('setAmount', {id: product.id, amount: product.amount})}}">-</button>
        <div class="amount">{{ product.amount }}</div>
        <button class="plus-btn" @click="(event) => 
        {product.amount += 1
        $store.dispatch('setAmount', {id: product.id, amount: product.amount})}">+</button>
    </div>
</template>

<script lang="ts">
import store from '@/store'
import { onMounted, ref } from 'vue'

export default {
    props: {
        product: Object,
    },

    watch: {
    product: {
      handler(newValue) {
        store.dispatch('setAmount', {id: newValue.id, amount: newValue.amount})
      },
      deep: true
    }
},
    setup(props) {
        onMounted(() => {
            if (props.product.amount == undefined) {
            props.product.amount = 1
        }
        })
        
        
    },
}
</script>

<style>
@import "@/assets/style.css";

.amount-checker {
    display: flex;
}

.amount-checker * {
    font-size:calc(15px + 8 * (100vw - 320px) / 880);
}

.minus-btn {
    border: solid black 2px;
    border-bottom-left-radius: 50%;
    border-top-left-radius: 50%;
    border-right: none;
    vertical-align: middle;
    padding: 0 10px;
    background: none;
}

.plus-btn:hover {
    background-color: #b4f600;
    transition: 0.2s;
}

.plus-btn {
    border: solid black 2px;
    border-bottom-right-radius: 50%;
    border-top-right-radius: 50%;
    border-left: none;
    vertical-align: middle;
    padding: 0 10px;
    background: none;
}

.minus-btn:hover {
    background-color: #b4f600;
    transition: 0.2s;
}

.amount {
    border: solid black 2px;
    border-left: none;
    border-right: none;
    font-size:calc(10px + 8 * (100vw - 320px) / 880);
    vertical-align: middle;
    min-width: calc(20px + 8 * (100vw - 320px) / 880);
    text-align: center;
}
</style>