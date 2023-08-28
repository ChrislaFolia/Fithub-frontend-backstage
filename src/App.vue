<script setup>
import NavbarTop from './components/NavbarTop.vue'
import NavbarLeft from './components/NavbarLeft.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <body class="sb-nav-fixed">
        <NavbarTop></NavbarTop>
        <NavbarLeft></NavbarLeft>
        <router-view></router-view>

    </body>
</template>

<style></style>