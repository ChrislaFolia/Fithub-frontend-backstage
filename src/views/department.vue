
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
                                            data-bs-target="#updateModal"
                                            @click="inputUpdateData(deptid, deptname)">修改</button>
                                    </td>
                                    <td><button type="submit" class="btn btn-outline-info" data-bs-toggle="modal"
                                            data-bs-target="#deleteModal"
                                            @click="inputDeleteData(deptid, deptname)">刪除</button></td>
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
                        部門名稱:<input type="text" class="form-control" v-model="updateDeptName" data-bs-container="body"
                            data-bs-toggle="popover" data-bs-placement="right" data-bs-content="請輸入資料"
                            id="popoversUpdateDeptName">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="submit" class="btn btn-primary" @click="updateDept()">修改</button>
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
                        部門名稱:<input type="text" class="form-control" v-model="insertDeptName" data-bs-container="body"
                            data-bs-toggle="popover" data-bs-placement="right" data-bs-content="請輸入資料"
                            id="popoversInsertDeptName">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="submit" class="btn btn-primary" @click="insertDept()">新增</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModal" aria-hidden="true"
        data-bs-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">刪除部門</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        部門名稱:<input type="text" class="form-control" v-model="deleteDeptName" readonly>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="submit" class="btn btn-primary" @click="deleteDept()">刪除</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'



const url = import.meta.env.VITE_API_JAVAURL
const updateDeptId = ref();
const updateDeptName = ref('');
const insertDeptName = ref('');
const deleteDeptId = ref();
const deleteDeptName = ref();

//載入所有dept資料
const products = ref([])

const loadProducts = async () => {
    //透過get方法呼叫/products/find 傳datas資料

    const response = await axios.get(`${url}/departments`)

    products.value = response.data

}

loadProducts()



onMounted(() => {
    // 這裡放置需要在組件掛載後執行的程式碼
    // 設定提示框
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    })

    var exampleTriggerEl = document.getElementById('popoversInsertDeptName')
    var popover = bootstrap.Popover.getInstance(exampleTriggerEl)

    var exampleTriggerUpdate = document.getElementById('popoversUpdateDeptName')
    var popover = bootstrap.Popover.getInstance(exampleTriggerUpdate)

    exampleTriggerEl.addEventListener('keyup', function () {
        if (!insertDeptName.value) {
            popover.show()
        } else {
            popover.hide()
        }
    })

    exampleTriggerUpdate.addEventListener('keyup', function () {
        if (!updateDeptName.value) {
            popover.show()
        } else {
            popover.hide()
        }
    })

});

// 點擊修改時觸發 帶入該筆資料
const inputUpdateData = (deptid, deptname) => {
    updateDeptId.value = deptid;
    updateDeptName.value = deptname;
};

// 點擊刪除時觸發 帶入該筆資料
const inputDeleteData = (deptid, deptname) => {
    deleteDeptId.value = deptid;
    deleteDeptName.value = deptname;
};



const insertDept = async () => {
    //抓彈出視窗
    var myModalEl = document.getElementById('insertModal')
    var modal = bootstrap.Modal.getInstance(myModalEl)

    var exampleTriggerEl = document.getElementById('popoversInsertDeptName')
    var popover = bootstrap.Popover.getInstance(exampleTriggerEl)

    //如果沒有值 return 不做
    if (!insertDeptName.value.trim()) {
        popover.show()
        return;
    }

    try {

        const response = await axios.post(`${url}/departments`, { deptname: insertDeptName.value })

        if (response.status == 200) {
            loadProducts(); // 重新載入資料
            insertDeptName.value = ''; // 清空 insertDeptName
            alert("新增成功")
        }
    } catch (error) {
        alert("新增失敗")
    } finally {
        //不管是否成功 modal切換
        modal.toggle();
    }
}

const updateDept = async () => {
    //抓彈出視窗
    var myModalEl = document.getElementById('updateModal')
    var modal = bootstrap.Modal.getInstance(myModalEl)

    var exampleTriggerEl = document.getElementById('popoversUpdateDeptName')
    var popover = bootstrap.Popover.getInstance(exampleTriggerEl)

    //如果沒有值 return 不做
    if (!updateDeptId.value || !updateDeptName.value.trim()) {
        popover.show()
        return;
    }


    try {
        const response = await axios.put(`${url}/departments/${updateDeptId.value}`, { deptid: updateDeptId.value, deptname: updateDeptName.value })

        if (response.status == 200) {
            loadProducts(); // 重新載入資料
            deleteDeptId.value = ''
            deleteDeptName.value = ''; // 清空 insertDeptName
            alert("修改成功")
        }


    } catch (error) {
        console.log(error.response)
        alert("修改失敗")
    } finally {
        //不管是否成功 modal切換
        modal.toggle();
    }
}


const deleteDept = async () => {
    //抓彈出視窗
    var myModalEl = document.getElementById('deleteModal')
    var modal = bootstrap.Modal.getInstance(myModalEl)
    console.log("deleteDept" + deleteDeptId.value + " " + deleteDeptName.value)

    //如果沒有值 return 不做
    if (!deleteDeptId.value) {
        return;
    }
    try {
        const response = await axios.delete(`${url}/departments/${deleteDeptId.value}`)

        if (response.status == 200) {
            loadProducts(); // 重新載入資料
            deleteDeptId.value = ''
            deleteDeptName.value = ''; // 清空 insertDeptName
            alert("刪除成功")
        }


    } catch (error) {
        console.log(error.response)
        alert("刪除失敗")
    } finally {
        //不管是否成功 modal切換
        modal.toggle();
    }
}

</script>

<style></style>