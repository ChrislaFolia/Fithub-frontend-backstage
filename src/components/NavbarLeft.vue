<script setup>
import { ref } from 'vue';
import Activity from './Navbar_Acitivity.vue'
import Organize from './Navbar_Organize.vue'
import RentOrder from './Navbar_RentOrder.vue';
const selectedOption = ref('both'); // 預設選擇單一 Activity 組件

</script>

<template>
    
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <select v-model="selectedOption">
                            <option value="singleActivity">單一 Activity</option>
                            <option value="singleOrganize">單一 Organize</option>
                            <option value="singleRentOrder">單一 RentOrder</option>
                            <option value="both">兩個一起顯示</option>
                        </select>

                        <!-- 條件渲染動態組件 -->
                        <div v-if="selectedOption === 'singleActivity'">
                            <Activity></Activity>
                        </div>
                        <div v-else-if="selectedOption === 'singleOrganize'">
                            <Organize></Organize>
                        </div>
                        <div v-else-if="selectedOption === 'singleRentOrder'">
                            <RentOrder></RentOrder>
                        </div>
                        
                        <div v-else-if="selectedOption === 'both'">
                            <Activity></Activity>
                            <Organize></Organize>
                            <RentOrder></RentOrder>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

