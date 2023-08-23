<template>
    <div id="layoutSidenav">
        <div id="layoutSidenav_content">
            <div class="container-fluid px-4">
                <h1 class="mt-4" style="text-align: center;">場地租借</h1>
                <div class="card mb-4">
                    <div class="card-body table-responsive">
                        <table class="table table-bordered">
                            <thead class="align-middle text-center">
                                <tr class="table-primary">
                                    <th>
                                        <button class="btn btn-outline-danger" @click="deleteSelected">刪除</button>
                                    </th>
                                    <th>會員姓名</th>
                                    <th>租借場地</th>
                                    <th>日期</th>
                                    <th>時段</th>
                                    <th>租借狀態</th>
                                    <th>修改</th>
                                </tr>
                            </thead>

                            <tbody class="align-middle text-center">
                                <tr v-for="(rentOrder, rentorderindex) in rentOrders" :key="rentorderindex">
                                    <td><input type="checkbox" v-model="selectedRentOrderIds"
                                            :value="rentOrder.rentorderid"></td>
                                    <td>{{ rentOrder.member.membername }}</td>
                                    <td>
                                        <span v-for="(classroom, classIndex) in rentOrder.classrooms" :key="classIndex">
                                            {{ classroom.classroomName }}
                                            <br>
                                        </span>
                                    </td>
                                    <td>{{ rentOrder.rentdate }}</td>
                                    <td>{{ rentOrder.renttime }}</td>
                                    <td>{{ rentOrder.rentstatus }}</td>
                                    <td><button type="submit" class="btn btn-outline-info">修改</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'


const rentOrders = ref([]); // 使用 ref 創建一個響應式變數
const selectedRentOrderIds = ref([]); // 儲存選中的 rentorderid

// 從伺服器獲取 JSON 資料
const getrentorder = async () => {
    try {
        const response = await axios.get('http://localhost:8080/fithub/rent/list'); // 替換為實際的 API URL
        rentOrders.value = response.data; //data為response物件的屬性，通常是返回的JSON格式資料
        console.log(rentOrders.value)

    } catch (error) {
        console.error('Error getrentorder data:', error);
    }
};


const deleteSelected = async () => {
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
};


onMounted(() => {
    getrentorder();
});
</script>

<style></style>