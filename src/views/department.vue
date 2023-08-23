

<template>
    <div id="layoutSidenav">
        <div id="layoutSidenav_content">
            <div class="container-fluid px-4">
                <h1 class="mt-4" style="text-align: center;">部門資料</h1>
                <div class="card mb-4">
                    <div class="card-body table-responsive">
                        <button type="submit" class="btn btn-outline-info" data-bs-toggle="modal"
                            data-bs-target="#insertModal">新增部門</button>
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
                                <tr v-for="{ deptid, deptname } in products" :key="deptid">
                                    <td>{{ deptid }}</td>
                                    <td>{{ deptname }}</td>
                                    <td><button type="submit" class="btn btn-outline-info" data-bs-toggle="modal"
                                            data-bs-target="#updateModal" @click="inputData(deptid, deptname)">修改</button>
                                    </td>
                                    <td><button>刪除</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModal" aria-hidden="true"
        data-bs-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">修改部門名稱</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        部門編號:<input type="text" class="form-control" v-model="updateDeptId" readonly>
                    </div>
                    <div class="mb-3">
                        部門名稱:<input type="text" class="form-control" v-model="updateDeptName" required>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">送出</button>
                </div>

            </div>
        </div>
    </div>

    <div class="modal fade" id="insertModal" tabindex="-1" aria-labelledby="insertModal" aria-hidden="true"
        data-bs-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">新增部門</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        部門名稱:<input type="text" class="form-control" v-model="insertDeptName" required>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#insertModal"
                        @click="insertDept()">送出</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue'

const url = import.meta.env.VITE_API_JAVAURL
const updateDeptId = ref();
const updateDeptName = ref();
const insertDeptName = ref();

const inputData = (deptid, deptname) => {
    console.log("test", deptid, deptname);
    updateDeptId.value = deptid;
    updateDeptName.value = deptname;
};



const products = ref([])

const loadProducts = async () => {
    //透過get方法呼叫/products/find 傳datas資料
    const response = await axios.get(`${url}/departments`)

    products.value = response.data

}

loadProducts()

const insertDept = async () => {
    try {
        const response = await axios.post(`${url}/departments`, { deptname: insertDeptName.value })

        if (response.status == 200) {
            console.log("2000000000000000000");
            loadProducts(); // 重新載入資料
            insertDeptName.value = ''; // 清空 insertDeptName
        } else if (response.status == 404) {
            console.log("400000000000");
            alert("新增失敗");
        }
        console.log(response.status)
    }catch(error){
        console.log(error.response)
        alert("新增失敗")
    }
    

    
}

</script>

<style></style>