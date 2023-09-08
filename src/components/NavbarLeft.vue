<script setup>
import { ref, onMounted } from "vue";
import Activity from "./Navbar_Acitivity.vue";
import Organize from "./Navbar_Organize.vue";
import Course from "./Navbar_Course.vue";
import Announcement from "./Navbar_Announcement.vue";
import RentOrder from "./Navbar_RentOrder.vue";
import Classroom from "./Navbar_Classroom.vue";
import Member from "./Navbar_member.vue";
import Coupons from "./Navbar_Coupons.vue";
import Orders from "./Navbar_Orders.vue";
import TestNavbar from "./NavbarTest.vue";
const selectedOption = ref("both"); // 預設選擇單一 Activity 組件

onMounted(() => {
  selectedOption.value = window.localStorage.getItem("loa");
  console.log(selectedOption.value);
  console.log(typeof selectedOption.value);
});
</script>

<template>
  <div id="layoutSidenav">
    <div id="layoutSidenav_nav">
      <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div class="sb-sidenav-menu">
          <div class="nav">
            <div v-if="selectedOption === '3'">
              <Announcement></Announcement>
              <Activity></Activity>
              <Course></Course>
              <RentOrder></RentOrder>
              <Classroom></Classroom>
              <Member></Member>
              <Organize></Organize>
              <TestNavbar></TestNavbar>
              <Coupons></Coupons>
              <Orders></Orders>
            </div>
            <div v-else-if="selectedOption === '2'">
              <Announcement></Announcement>
              <Activity></Activity>
              <Course></Course>
              <RentOrder></RentOrder>
              <Classroom></Classroom>
              <Member></Member>
              <Coupons></Coupons>
              <Orders></Orders>
            </div>
            <div v-else-if="selectedOption === '1'">
              <Announcement></Announcement>
              <Activity></Activity>
              <Course></Course>
              <RentOrder></RentOrder>
              <Classroom></Classroom>
              <Coupons></Coupons>
              <Orders></Orders>
            </div>

            <!-- 條件渲染動態組件 -->
            <!-- <div v-if="selectedOption === 'singleActivity'">
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
                        
                        <div v-else-if="selectedOption === 'both'">
                          
                        </div> -->
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
