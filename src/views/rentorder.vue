<template>
    <body class="sb-nav-fixed">
        <NavbarTop></NavbarTop>
        <NavbarLeft></NavbarLeft>
        <div id="layoutSidenav">
            <div id="layoutSidenav_content">
                <div class="container-fluid px-4">
                    <h1 class="mt-4" style="text-align: center;">場地租借</h1>
                    <div class="card mb-4">
                        <div class="card-body table-responsive">
                            <button class="btn btn btn-primary" @click="exportXlsx" style="margin-bottom: 10px">
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
                                    <tr v-for="(rentOrder, rentorderindex) in rentOrders" :key="rentorderindex">
                                        <td><input type="checkbox" v-model="selectedRentOrderIds"
                                                :value="rentOrder.rentorderid"></td>
                                        <td>{{ rentOrder.rentorderdate }}</td>
                                        <td>{{ rentOrder.member.membername }}</td>
                                        <td>{{ rentOrder.classroom.classroomName }}</td>
                                        <td>{{ rentOrder.rentdate }}</td>
                                        <td>{{ rentOrder.renttime }}</td>
                                        <td>{{ rentOrder.rentstatus }}</td>
                                        <td><button type="submit" class="btn btn-outline-info" data-bs-toggle="modal"
                                                data-bs-target="#updateModal">修改</button></td>
                                    </tr>
                                </tbody>
                            </table>
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
import { ref, onMounted } from 'vue'
import NavbarTop from '../components/NavbarTop.vue'
import NavbarLeft from '../components/NavbarLeft.vue'
import * as XLSX from 'xlsx'

const rentOrders = ref([]); // 使用 ref 創建一個響應式變數
const selectedRentOrderIds = ref([]); // 儲存選中的 rentorderid
const xlsxData = ref([]) //儲存匯出xlsx需要的資料

// 將json資料匯出xlsx檔
function exportXlsx() {
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(xlsxData.value)
    XLSX.utils.book_append_sheet(wb, ws, '租借訂單')
    XLSX.writeFile(wb, 'RentOrder.xlsx')
}

// 從伺服器獲取 JSON 資料
const getrentorder = async () => {
    try {
        const response = await axios.get('http://localhost:8080/fithub/rent/list'); // 替換為實際的 API URL
        rentOrders.value = response.data; //data為response物件的屬性，通常是返回的JSON格式資料

        xlsxData.value = rentOrders.value.map(rentOrder => ({
            rentOrderId: rentOrder.rentorderid,
            rentOrderDate: rentOrder.rentorderdate,
            memberName: rentOrder.member.membername,
            classroomName: rentOrder.classroom.classroomName,
            rentDate: rentOrder.rentdate,
            rentTime: rentOrder.renttime,
            rentStatus: rentOrder.rentstatus,
        }));

        console.log(rentOrders.value)

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
    getrentorder();
});
</script>

<style></style>