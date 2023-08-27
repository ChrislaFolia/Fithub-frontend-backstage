<script setup>
import { ref } from 'vue';
import Activity from './Navbar_Acitivity.vue'
import Organize from './Navbar_Organize.vue'
import Coupons from './Navbar_Coupons.vue'
const selectedOption = ref('getAll'); // 預設選擇單一 Activity 組件
import RentOrder from './Navbar_RentOrder.vue';
import Classroom from './Navbar_Classroom.vue';
import Orders from './Navbar_Orders.vue';

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
                            <option value="singleCoupons">單一 Coupons</option>
                            <option value="getAll">一起顯示</option>
                            <option value="singleRentOrder">單一 RentOrder</option>
                            <option value="singleClassroom">單一 Classroom</option>
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
                        <div v-else-if="selectedOption === 'singleClassroom'">
                            <Classroom></Classroom>
                        </div>
                        <div v-else-if="selectedOption === 'singleCoupons'">
                            <Coupons></Coupons>
                        </div>
                        <div v-else-if="selectedOption === 'getAll'">
                            <Activity></Activity>
                            <Organize></Organize>
                            <Coupons></Coupons>
                            <RentOrder></RentOrder>
                            <Classroom></Classroom>
                            <Orders></Orders>
                        </div>


                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

