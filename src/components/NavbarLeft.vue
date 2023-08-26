<script setup>
import { ref } from 'vue';
import Activity from './Navbar_Acitivity.vue'
import Organize from './Navbar_Organize.vue'
import Course from './Navbar_Course.vue'
import RentOrder from './Navbar_RentOrder.vue';
import Classroom from './Navbar_Classroom.vue';
import Announcement from './Navbar_Announcement.vue';

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
                        <Classroom></Classroom>
                        <RentOrder></RentOrder>
                        <Announcement></Announcement>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

