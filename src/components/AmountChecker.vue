<template>
    <div class="amount-checker">
        <button class="minus-btn" @click="minus">-</button>
        <div class="amount">{{ currentAmount }}</div>
        <button class="plus-btn" @click="currentAmount += 1">+</button>
    </div>
</template>

<script>
export default {
    props: {
        amount: 1
    },

    mounted() {
        this.currentAmount = this.amount
    },

    methods: {
        minus() {
            if (this.currentAmount > 1) {
                this.currentAmount -= 1
            }
        }
    },

    data() {
        return {
            currentAmount: 1
        }
    }
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
    padding: 5px 10px;
}
</style>