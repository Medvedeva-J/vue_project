<template>
    <div class="popup">
        <div class="popup-content">
            <img :src="product.image">
            <div class="popup-info">
                <div style="display: flex; justify-content: flex-start; flex-direction: column;">
                    <p class="popup-header">{{ product.title }}</p>
                    <textarea readonly rows="8" class="popup-description">{{ product.description }}</textarea>
                    <p class="popup-price">{{ product.price }} $</p>
                </div>
                <div style="display: flex; align-items: center;">
                    <button class="like-btn small-btn" @click="$store.dispatch('toggleFav', product.id)">
                        <svg v-if="product.isFav" width="24px" height="24px" viewBox="0 0 0.45 0.45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.121 0.03a0.121 0.121 0 0 0 -0.086 0.207l0.179 0.179a0.015 0.015 0 0 0 0.021 0l0.179 -0.179a0.121 0.121 0 0 0 -0.171 -0.171l-0.018 0.018 -0.018 -0.018A0.121 0.121 0 0 0 0.121 0.03Z" fill="crimson"/></svg>
                        <svg v-if="!product.isFav" width="24px" height="24px" viewBox="0 0 0.45 0.45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m0.225 0.405 -0.011 0.011a0.015 0.015 0 0 0 0.021 0L0.225 0.405ZM0.046 0.226l-0.011 0.011 0.011 -0.011Zm0.15 -0.15 -0.011 0.011 0.011 -0.011ZM0.225 0.105l-0.011 0.011a0.015 0.015 0 0 0 0.021 0L0.225 0.105Zm0.029 -0.029 -0.011 -0.011 0.011 0.011Zm-0.018 0.318L0.057 0.215l-0.021 0.021 0.179 0.179 0.021 -0.021Zm0.158 -0.179 -0.179 0.179 0.021 0.021 0.179 -0.179 -0.021 -0.021ZM0.185 0.087l0.029 0.029 0.021 -0.021 -0.029 -0.029 -0.021 0.021Zm0.05 0.029 0.029 -0.029 -0.021 -0.021 -0.029 0.029 0.021 0.021ZM0.329 0.03c-0.032 0 -0.063 0.013 -0.086 0.035l0.021 0.021C0.282 0.07 0.305 0.06 0.329 0.06V0.03ZM0.42 0.151c0 0.024 -0.01 0.047 -0.027 0.064l0.021 0.021A0.121 0.121 0 0 0 0.45 0.151h-0.03Zm0.03 0A0.121 0.121 0 0 0 0.329 0.03v0.03A0.091 0.091 0 0 1 0.42 0.151h0.03ZM0.121 0.06c0.024 0 0.047 0.01 0.064 0.027l0.021 -0.021A0.121 0.121 0 0 0 0.121 0.03v0.03ZM0.03 0.151A0.091 0.091 0 0 1 0.121 0.06V0.03A0.121 0.121 0 0 0 0 0.151h0.03Zm0.027 0.064A0.091 0.091 0 0 1 0.03 0.151H0c0 0.032 0.013 0.063 0.035 0.086l0.021 -0.021Z" fill="#000000"/></svg>
                    </button>
                    <button class="cart-btn small-btn" @click="$store.dispatch('toggleCart', product.id)">
                        <svg v-if="product.isInCart" width="24px" height="24px" viewBox="0 0 0.45 0.45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.029 0.011 0.001 0.019 0.094 0.33H0.45V0.135A0.075 0.075 0 0 0 0.375 0.06H0.044L0.029 0.011Z" fill="#000000"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0.165 0.36a0.045 0.045 0 1 0 0 0.09 0.045 0.045 0 0 0 0 -0.09ZM0.15 0.405a0.015 0.015 0 1 1 0.03 0 0.015 0.015 0 0 1 -0.03 0Z" fill="#000000"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0.375 0.36a0.045 0.045 0 1 0 0 0.09 0.045 0.045 0 0 0 0 -0.09Zm-0.015 0.045a0.015 0.015 0 1 1 0.03 0 0.015 0.015 0 0 1 -0.03 0Z" fill="#000000"/></svg>
                        <svg v-if="!product.isInCart" width="24px" height="24px" viewBox="0 0 0.45 0.45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m0.015 0.015 0.018 0.06m0 0 0.072 0.24h0.33v-0.18a0.06 0.06 0 0 0 -0.06 -0.06H0.033Zm0.342 0.36a0.03 0.03 0 1 1 0 -0.06 0.03 0.03 0 0 1 0 0.06Zm-0.24 -0.03a0.03 0.03 0 1 1 0.06 0 0.03 0.03 0 0 1 -0.06 0Z" stroke="#000000" stroke-width="0.03"/></svg>
                    </button>
                    <AmountChecker v-if="product.isInCart" style="margin-left:10px" :product="product"></AmountChecker>
                </div>
            </div>           
            <button class="close-btn small-btn" @click="$emit('closePopupInfo')">
                <svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/></svg>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import AmountChecker from '@/components/AmountChecker.vue';

export default {
    props: {
        product: Object
    },

    components: {
        AmountChecker
    },

    data() {
    return {
        amount: 1,
  }
}
}
</script>

<style>
@import "@/assets/style.css";
.popup{
    width:100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
    overflow:hidden;
    position:fixed;
    top:0;
    left:0;
    right: 0;
    bottom: 0;
}

.popup-content{
    min-width: fit-content;
    max-width: 90vw;
    min-height: fit-content;
    max-height: 90vh;
    padding:20px;
    background-color: white;
    border-radius:12px;
    box-shadow: 0px 0px 10px #000;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: row;
}

.popup-content img {
    position: relative;
    max-height: 60vh;
    max-width: 20vw;
    align-self: center;
    margin: 10px;
}

.popup-info *{
    font-weight:300;
    margin: 10px 0;
    margin-left: 0;
    margin-right: auto;
}

.popup-info {
    max-width:70vw;
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    justify-content:stretch;
}

.popup-header {
    font-size:calc(15px + 8 * (100vw - 320px) / 880);
    text-align: left;
}

.popup-description {
    overflow-y: auto;
    resize: none;
    border: none;
    padding-right: 10px;
    color: gray;
    font-size:calc(10px + 8 * (100vw - 320px) / 880);
    max-height: fit-content;
    position: relative;
    width: 100%;
}

.popup-price {
    font-size:calc(20px + 8 * (100vw - 320px) / 880);
    text-align: left;
    font-weight:500!important;
    color: crimson;
    margin: 0;
}

.like-btn {
    font-size: calc(10px + 8 * (100vw - 320px) / 880);
    margin-right: 10px;
}

.cart-btn {
    font-size: calc(10px + 8 * (100vw - 320px) / 880);
    margin: 0 10px;
}
</style>