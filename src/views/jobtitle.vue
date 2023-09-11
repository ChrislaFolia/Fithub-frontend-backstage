<template>
    <body class="sb-nav-fixed">
        <NavbarTop></NavbarTop>
        <NavbarLeft></NavbarLeft>


        <div id="layoutSidenav">
            <div id="layoutSidenav_content">
                <div class="container-fluid px-4">
                    <h1 class="mt-4" style="text-align: center;">職稱管理</h1>
                    <div class="card mb-4">
                        <div class="card-body table-responsive">
                            <button type="submit" class="btn btn-outline-info" data-bs-toggle="modal"
                                data-bs-target="#insertModal">新增職稱</button>
                            <table id="specialtysTable" class="table table-bordered">
                                <thead class="align-middle text-center">
                                    <tr class="table-primary">
                                        <th>職位名稱</th>
                                        <th>修改</th>
                                        <th>刪除</th>
                                    </tr>
                                </thead>
                                <tbody class="align-middle text-center">
                                    <tr v-for="jobTitle in allJobTItles" :key="jobTitle.jobtitleid">
                                        <td>{{ jobTitle.jobtitlename}}</td>
                                        <td><button type="submit" class="btn btn-outline-info" data-bs-toggle="modal"
                                                data-bs-target="#updateModal" @click="inputUpdateData(jobTitle)">修改</button>
                                        </td>
                                        <td><button type="submit" class="btn btn-outline-info" data-bs-toggle="modal"
                                                data-bs-target="#deleteModal" @click="inputDeleteData(jobTitle)">刪除</button>
                                        </td>
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
                        <h5 class="modal-title" id="exampleModalLabel">修改職稱</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            職稱:
                            <input type="text" class="form-control" v-model="updateJobTitle.jobtitlename">
                            <span v-if="!updateJobTitle.jobtitlename" class="text-danger">必填</span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                        <button type="submit" class="btn btn-primary" @click="updateData()">修改</button>
                    </div>

                </div>
            </div>
        </div>

        <div class="modal fade" id="insertModal" tabindex="-1" aria-labelledby="insertModal" aria-hidden="true"
            data-bs-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">新增職稱</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            職稱:
                            <input type="text" class="form-control" v-model="insertJobTitle.jobtitlename">
                            <span v-if="!insertJobTitle.jobtitlename" class="text-danger">必填</span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                        <button type="submit" class="btn btn-primary" @click="insertData()">新增</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModal" aria-hidden="true"
            data-bs-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">刪除職稱</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            職稱:
                            <input type="text" class="form-control" v-model="deleteJobTitle.jobtitlename" readonly>
                            <span v-if="!deleteJobTitle.jobtitlename" class="text-danger">必填</span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                        <button type="submit" class="btn btn-primary" @click="deleteData()">刪除</button>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>


<script setup>
import axios from 'axios';
import { ref, reactive, onMounted } from 'vue'
import NavbarTop from '../components/NavbarTop.vue'
import NavbarLeft from '../components/NavbarLeft.vue'

const url = import.meta.env.VITE_API_JAVAURL
const insertJobTitle = reactive({
    jobtitleid: '',
    jobtitlename: '',
});
const updateJobTitle = reactive({});


const deleteJobTitle = reactive({});

//存所有dept資料
const allJobTItles = ref([])

const loadDatas = async () => {
    //透過get方法呼叫/products/find 傳datas資料

    const responsJobTitles = await axios.get(`${url}/jobtitles`)

    allJobTItles.value = responsJobTitles.data


}

onMounted(() => {
    loadDatas()
});

const inputUpdateData = (data) => {
    Object.assign(updateJobTitle, data);
};

const inputDeleteData = async (data) => {
    await Object.assign(deleteJobTitle, data);
};



const insertData = async () => {
    //抓彈出視窗
    var myModalEl = document.getElementById('insertModal')
    var modal = bootstrap.Modal.getInstance(myModalEl)

    //如果沒有值 return 不做
    if (!insertJobTitle.jobtitlename) {
        alert("請輸入正確資料")
        return;
    }

    try {
        const response = await axios.post(`${url}/jobtitles`, { jobtitlename: insertJobTitle.jobtitlename})
        if (response.status === 200) {
            loadDatas(); // 重新載入資料
            insertJobTitle.jobtitlename = ''; // 清空 insertJobTitleid
            alert("新增成功")
        }
    } catch (error) {
        alert("新增失敗")
    } finally {
        //不管是否成功 modal切換
        modal.toggle();
    }
}

const updateData = async () => {
    //抓彈出視窗
    var myModalEl = document.getElementById('updateModal')
    var modal = bootstrap.Modal.getInstance(myModalEl)


    //如果沒有值 return 不做
    if (!updateJobTitle.jobtitleid || !updateJobTitle.jobtitlename) {
        alert("請輸入正確資料")
        return;
    }


    try {
        const response = await axios.put(`${url}/jobtitles/${updateJobTitle.jobtitleid}`, { jobtitleid: updateJobTitle.jobtitleid, jobtitlename: updateJobTitle.jobtitlename, jobtitlename: updateJobTitle.jobtitlename })

        if (response.status == 200) {
            loadDatas(); // 重新載入資料
            alert("修改成功")
        }


    } catch (error) {
        alert("修改失敗")
    } finally {
        //不管是否成功 modal切換
        modal.toggle();
    }
}


const deleteData = async () => {
    //抓彈出視窗
    var myModalEl = document.getElementById('deleteModal')
    var modal = bootstrap.Modal.getInstance(myModalEl)

    // 如果沒有值 return 不做
    if (!deleteJobTitle.jobtitleid) {
        return;
    }

    try {
        const response = await axios.delete(`${url}/jobtitles/${deleteJobTitle.jobtitleid}`)

        if (response.status == 200) {
            loadDatas(); // 重新載入資料
            alert("刪除成功")
        }


    } catch (error) {
        alert("刪除失敗")
    } finally {
        //不管是否成功 modal切換
        modal.toggle();
    }
}

</script>