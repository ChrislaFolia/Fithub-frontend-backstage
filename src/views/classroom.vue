<template>
    <div id="layoutSidenav">
        <div id="layoutSidenav_content">
            <div class="container-fluid px-4">
                <h1 class="mt-4" style="text-align: center;">教室</h1>
                <div class="card mb-4">
                    <div class="card-body table-responsive">
                        <table class="table table-bordered">
                            <thead class="align-middle text-center">
                                <tr class="table-primary">
                                    <th>
                                        <button class="btn btn-outline-danger" @click="deleteSelected">刪除</button>
                                    </th>
                                    <th>教室名稱</th>
                                    <th>簡介</th>
                                    <th>價格</th>
                                    <th>狀態</th>
                                    <th>修改</th>
                                </tr>
                            </thead>

                            <tbody class="align-middle text-center">
                                <tr v-for="(classroom, classroomindex) in classrooms" :key="classroomindex">
                                    <td><input type="checkbox" v-model="selectedClassrooms" :value="classroom.classroomId"></td>
                                    <td>{{ classroom.classroomName }}</td>
                                    <td>{{ classroom.classroomDescription }}</td>
                                    <td>{{ classroom.classroomPrice }}</td>
                                    <td>{{ classroom.classroomStatus }}</td>
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
                        日期:<input type="date" class="form-control"  required="required">
                    </div>
                    <div class="mb-3">
                        時段:<select class="form-control">
                            <option>早上</option>
                            <option>中午</option>
                            <option>下午</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        租借狀態:<select class="form-control">
                            <option>處理中</option>
                            <option>已確認</option>
                            <option>已完成</option>
                            <option>已取消</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">送出</button>
                </div>

            </div>
        </div>
    </div>
</template>
  
<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'


const classrooms = ref([]); // 使用 ref 創建一個響應式變數
const selectedClassrooms = ref([]); // 儲存選中的 ClassroomID

// 從伺服器獲取 JSON 資料
const getclassroom = async () => {
    try {
        const response = await axios.get('http://localhost:8080/fithub/classroom/list'); // 替換為實際的 API URL
        classrooms.value = response.data; //data為response物件的屬性，通常是返回的JSON格式資料
        console.log(classrooms.value)

    } catch (error) {
        console.error('Error getclassroom data:', error);
    }
};


const deleteSelected = async () => {
    try {
        // 將選中的 ClassroomID 送到後端進行刪除
        const response = await axios.delete('http://localhost:8080/fithub/classroom/delete/multiple', {
            data: selectedClassrooms.value
        });

        // 刷新資料
        getclassroom();
        selectedClassrooms.value = []; // 清空選中的項目
    } catch (error) {
        console.error('Error deleting rent orders:', error);
    }
};


onMounted(() => {
    getclassroom();
});
</script>

<style></style>