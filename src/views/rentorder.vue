<template>
    <body class="sb-nav-fixed">
        <NavbarTop></NavbarTop>
        <NavbarLeft></NavbarLeft>
        <div id="layoutSidenav">
            <div id="layoutSidenav_content">
                <div class="container-fluid px-4">
                    <h1 class="mt-4 text-center">場地租借</h1>
                    <div class="card">
                        <div class="card-body table-responsive">
                            <div class="col-3 mb-3">
                                <select class="form-select" @change="changeHandler(-1)" v-model.number="row">
                                    <option value=5 selected>每頁 5 筆資料</option>
                                    <option value=10>每頁 10 筆資料</option>
                                </select>
                            </div>
                            <div class="col-3">
                                <i class="bi bi-patch-question-fill" title="請輸入西元年,年-月,年-月-日(月日請補0)"></i>
                                <input type="search" class="form-control mb-3" @keyup="changeHandler(-1)" v-model="date"
                                    placeholder="請輸入日期">

                            </div>
                            <button class="btn mb-3 btn-primary" @click="exportXlsx">
                                匯出訂單
                            </button>
                            <table id="table1" class="table table-bordered">
                                <thead class="align-middle text-center">
                                    <tr class="table-primary">
                                        <th>
                                            <button class="btn btn-outline-danger" @click="deleteSelected">刪除</button>
                                        </th>
                                        <th>訂單日期</th>
                                        <th>會員姓名</th>
                                        <th>租借場地</th>
                                        <th>預約日期</th>
                                        <th>時段</th>
                                        <th>租借狀態</th>
                                        <th>修改</th>
                                    </tr>
                                </thead>

                                <tbody class="align-middle text-center">
                                    <tr v-for="(rentOrder, rentorderindex) in rentorderPage.content" :key="rentorderindex">
                                        <td><input type="checkbox" v-model="selectedRentOrderIds"
                                                :value="rentOrder.rentorderid"></td>
                                        <td>{{ rentOrder.rentorderdate }}</td>
                                        <td>{{ rentOrder.member.membername }}</td>
                                        <td>{{ rentOrder.classroom.classroomName }}</td>
                                        <td>{{ rentOrder.rentdate }}</td>
                                        <td>{{ rentOrder.renttime }}</td>
                                        <td>{{ rentOrder.rentstatus }}</td>
                                        <td><button type="submit" class="btn btn-outline-secondary" data-bs-toggle="modal"
                                                data-bs-target="#updateModal">修改</button></td>
                                    </tr>
                                </tbody>
                            </table>
                            <nav>
                                <ul class="pagination pagination-sm">
                                    <li class="page-item" v-for="(value, index) in rentorderPage.totalPages" :key="index">
                                        <a class="page-link"
                                            :class="{ 'selected-page': value - 1 === rentorderPage.number }"
                                            @click="changeHandler(value)">
                                            {{ value }}
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 彈出視窗 -->
        <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModal" aria-hidden="true"
            data-bs-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">修改訂單</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            租借場地:<input type="text" class="form-control" required="required">
                        </div>
                        <div class="mb-3">
                            預約日期:<input type="date" class="form-control" required="required">
                        </div>
                        <div class="mb-3">
                            時段:<select class="form-control">
                                <option>早上</option>
                                <option>下午</option>
                                <option>晚上</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            租借狀態:<select class="form-control">
                                <option>未付款</option>
                                <option>已付款</option>
                                <option>取消</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">送出</button>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>
  
<script setup>
import axios from 'axios'
import { ref, onMounted, reactive } from 'vue'
import NavbarTop from '../components/NavbarTop.vue'
import NavbarLeft from '../components/NavbarLeft.vue'

import * as XLSX from 'xlsx'

const rentorderPage = ref([])
const selectedRentOrderIds = ref([]); // 儲存選中的 rentorderid
const xlsxData = ref([]) //儲存匯出xlsx需要的資料

// 將json資料匯出xlsx檔
function exportXlsx() {
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(xlsxData.value)
    XLSX.utils.book_append_sheet(wb, ws, '租借訂單')
    XLSX.writeFile(wb, 'RentOrder.xlsx')
}


// 分頁 預設5筆資料 第0頁
let row = ref(5);
let date = ref('')
const page = reactive({
    number: 0,
    row: row.value,
    date: date.value
})

const changeHandler = (value) => {
    page.row = row.value
    page.date = date.value
    //
    if (value >= 0) {
        page.number = value - 1;
    } else {
        page.number = 0
    }
    getrentorderpage();
};



// 從伺服器獲取 JSON 資料
// const getrentorder = async () => {
//     try {
//         const response = await axios.get('http://localhost:8080/fithub/rent/list'); // 替換為實際的 API URL
//         rentOrders.value = response.data; //data為response物件的屬性，通常是返回的JSON格式資料

//         xlsxData.value = rentOrders.value.map(rentOrder => ({
//             rentOrderId: rentOrder.rentorderid,
//             rentOrderDate: rentOrder.rentorderdate,
//             memberName: rentOrder.member.membername,
//             classroomName: rentOrder.classroom.classroomName,
//             rentDate: rentOrder.rentdate,
//             rentTime: rentOrder.renttime,
//             rentStatus: rentOrder.rentstatus,
//         }));

//         console.log(rentOrders.value)

//     } catch (error) {
//         console.error('Error getrentorder data:', error);
//     }
// };

// 從伺服器獲取訂單分頁資料
const getrentorderpage = async () => {
    try {

        console.log(page)
        const response = await axios.post('http://localhost:8080/fithub/rent/findallpage', page); // 替換為實際的 API URL
        rentorderPage.value = response.data;
        console.log(rentorderPage.value)

        // 挑選需要的欄位輸出成檔案
        xlsxData.value = rentorderPage.value.content.map(rentOrder => ({
            rentOrderId: rentOrder.rentorderid,
            rentOrderDate: rentOrder.rentorderdate,
            memberName: rentOrder.member.membername,
            classroomName: rentOrder.classroom.classroomName,
            rentDate: rentOrder.rentdate,
            rentTime: rentOrder.renttime,
            rentStatus: rentOrder.rentstatus,
        }));

        // console.log(xlsxData.value)

    } catch (error) {
        console.error('Error getrentorder data:', error);
    }
};

// 刪除多筆教室
const deleteSelected = async () => {

    const checkDelete = window.confirm('確定要刪除選中的教室嗎？');
    if (checkDelete) {
        try {
            // 將選中的 rentorderid 送到後端進行刪除
            const response = await axios.delete('http://localhost:8080/fithub/rent/delete/multiple', {
                data: selectedRentOrderIds.value
            });

            // 刷新資料
            getrentorder();
            selectedRentOrderIds.value = []; // 清空選中的項目
        } catch (error) {
            console.error('Error deleting rent orders:', error);
        }
    }
};


onMounted(() => {
    // getrentorder();
    getrentorderpage();
});
</script>

<style scoped>
.pagination li {
    cursor: pointer;
}

.selected-page {
    background-color: lightblue;
}
</style>