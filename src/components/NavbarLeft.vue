<script setup>
import { ref } from 'vue';
import Activity from './Navbar_Acitivity.vue'
import Organize from './Navbar_Organize.vue'
import Course from './Navbar_Course.vue'

</script>

<template>
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <Activity></Activity>
                        <Organize></Organize>
                        <Course></Course>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

