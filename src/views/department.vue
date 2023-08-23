

<template>
    <div id="layoutSidenav">
        <div id="layoutSidenav_content">
            <div class="container-fluid px-4">
                <h1 class="mt-4" style="text-align: center;">部門資料</h1>
                <div class="card mb-4">
                    <div class="card-body table-responsive">
                        <button onclick="showModal('addModal')">新增部門</button>
                        <table id="departmentsTable" class="table table-bordered">
                            <thead class="align-middle text-center">
                                <tr class="table-primary">
                                    <th>部門編號</th>
                                    <th>部門名稱</th>
                                    <th>修改</th>
                                    <th>刪除</th>
                                </tr>
                            </thead>
                            <tbody class="align-middle text-center">
                                <tr v-for="{ deptid, deptname } in products" :key="product.id">
                                    <td>{{ deptid }}</td>
                                    <td>{{ deptname }}</td>
                                    <td><button @onclick="showDetails(deptid, deptname)">修改</button></td>
                                    <td><button>刪除</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <!-- 弹出窗口的 HTML -->
    <div id="detailsModal" class="modal-gpt" style="display: none;">
        <div class="modal-content-gpt">
            <h3>部門詳細資料</h3>
            <form id="detailsForm">
                <label for="deptIdUpdate">部門編號:</label>
                <input type="text" id="deptIdUpdate" name="deptIdUpdate" readonly><br>

                <label for="deptNameUpdate">部門名稱:</label>
                <input type="text" id="deptNameUpdate" name="deptNameUpdate"><br>
                <br>

                <input type="button" onclick="saveDetails()" value="儲存">
                <input type="button" onclick="hideModal('detailsModal')" value="取消">
            </form>
        </div>
    </div>

    <div id="addModal" class="modal-gpt" style="display: none;">
        <div class="modal-content-gpt">
            <h3>新增部門</h3>
            <form id="addForm">
                <label for="deptNameInsert">部門名稱:</label>
                <input type="text" id="deptNameInsert" name="deptNameInsert"><br>

                <input type="button" onclick="submitAdd()" value="送出">
                <input type="button" onclick="hideModal('addModal')" value="關閉">
            </form>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue'
const url = import.meta.env.VITE_API_JAVAURL

const product = ref({})

const products = ref([])

const loadProducts = async () => {
    //透過get方法呼叫/products/find 傳datas資料
    const response = await axios.get(`${url}/departments`)

    products.value = response.data

    console.log(products.value)
    // console.log(response.data)
    // products.value = response.data.list

    //計算總共有幾頁
    // totalPages.value = datas.rows == 0 ? 1 : Math.ceil(response.data.count / datas.rows)
    // console.log(totalPages.value)
}

loadProducts()

const showDetails = (deptid, deptname) => {
    
};
</script>

<style>
@import '../assets/css/modal-gpt.css';
</style>