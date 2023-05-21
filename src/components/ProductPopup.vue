<template>
    <div>
        <img v-bind:src="product.image">
        <div>MEOW</div>
    </div>
</template>

<script>

export default {

    props: {
        product: Object
    },

    methods: {
        mounted() {
        }
    }
}
</script>