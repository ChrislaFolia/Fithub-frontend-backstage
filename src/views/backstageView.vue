<template>
    <body class="sb-nav-fixed">
        <NavbarTop></NavbarTop>
        <NavbarLeft></NavbarLeft>
        <div id="layoutSidenav">
            <div id="layoutSidenav_content">
                <div class="container-fluid px-4">
                    <!-- 標題 -->
                    <h1 class="mt-4 text-center">Dashboard</h1>
                    <hr>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="card mb-4">
                                <div class="card-header">
                                    <i class="fas fa-chart-area me-1"></i>
                                    新增會員
                                </div>
                                <Bar id="my-chart-id" :options="chartOptions" :data="barData" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="card mb-4">
                                <div class="card-header">
                                    <i class="fas fa-chart-bar me-1"></i>
                                    每月營收
                                </div>
                                <Line :options="options" :data="lineData" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="card mb-4">
                                <div class="card-header">
                                    <i class="fas fa-chart-bar me-1"></i>
                                    購課類型
                                </div>
                                <Doughnut :options="options" :data="doughnutBuyData" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="card mb-4 ">
                                <div class="card-header">
                                    <i class="fas fa-chart-bar me-1"></i>
                                    會員年齡層
                                </div>
                                <Doughnut :options="options" :data="doughnutMemberData" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<script setup>
import NavbarTop from '../components/NavbarTop.vue'
import NavbarLeft from '../components/NavbarLeft.vue'
// 長條圖
import { Bar } from 'vue-chartjs'
// 折線圖
import { Line } from 'vue-chartjs'
import { PointElement, LineElement } from 'chart.js';
// 圓餅圖
import { Doughnut } from 'vue-chartjs'
// 導入圖表模塊
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'
// 註冊導入的模塊和元素
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, ArcElement)

// 長條圖
const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
            label: '會員',
            backgroundColor: 'rgba(161, 198, 247, 1)',
            borderColor: 'rgb(47, 128, 237)',
            data: [110, 115, 122, 133, 79, 220, 158, 172, 142, 155, 189, 222]
        }
    ]
}

// 折線圖
const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
            label: '課程',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 2,
            data: [610000, 550000, 870000, 430000, 740000, 660000, 810000, 710000, 910000, 590000, 590000, 680000]
        }, {
            label: '場地租借',
            backgroundColor: 'rgba(161, 198, 247, 1)',
            borderColor: 'rgb(47, 128, 237)',
            borderWidth: 2,
            data: [120000, 220000, 330000, 170000, 160000, 310000, 210000, 145000, 267000, 134000, 230000, 315000]
        }
    ]
}

// 購課類型圓餅圖
const doughnutBuyData = {
    labels: ['重量訓練', '有氧運動', '綜合體能', '瑜伽', '格鬥訓練', '舞蹈', '伸展'],
    datasets: [
        {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#9A42E1', '#F0A500', '#23D160', '#2D4059', '#EF476F', '#FFD166', '#06D6A0'],
            data: [40, 20, 80, 10, 30, 45, 55]
        }
    ]
}

// 會員年齡層圓餅圖
const doughnutMemberData = {
    labels: ['1-24歲', '25-49歲', '50-65歲', '66-100歲'],
    datasets: [
        {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#9A42E1', '#F0A500', '#23D160', '#2D4059', '#EF476F', '#FFD166', '#06D6A0'],
            data: [30, 50, 10, 3]
        }
    ]
}

//設定圖表
const options = {
    responsive: true,
    // maintainAspectRatio: true
}
</script>


<style scoped>
.chart-container {
    position: relative;
    margin: auto;
    height: 40vh;
    width: 40vw;
}
</style>