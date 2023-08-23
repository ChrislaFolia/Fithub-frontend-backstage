<script setup>
import NavbarTop from './components/NavbarTop.vue'
import NavbarLeft from './components/NavbarLeft.vue'
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <body class="sb-nav-fixed">
        <NavbarTop></NavbarTop>
        <NavbarLeft></NavbarLeft>
        <router-view></router-view>
    </body>
</template>

<style>
div {
    border: 1px red solid;
}
</style>