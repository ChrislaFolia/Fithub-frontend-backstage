<template>
    <body class="sb-nav-fixed">
        <NavbarTop></NavbarTop>
        <NavbarLeft></NavbarLeft>

        <div id="layoutSidenav">
            <div id="layoutSidenav_content">
                <div class="container-fluid px-4">
                    <h1 class="mt-4" style="text-align: center;">後台帳戶</h1>

                    <div class="card mb-4">
                        <div class="card-body table-responsive">
                            <button type="submit" class="btn btn-outline-info" data-bs-toggle="modal"
                                data-bs-target="#insertModal">新增帳戶</button>

                            <div class="col-3" style="padding-top: 20px;">
                                <PageSize @pageSizeChange="changeHandler"></PageSize>
                            </div>
                            <div class="col-3">
                                <SearchTextBox @searchInput="inputHandler"></SearchTextBox>
                            </div>
                            <table id="departmentsTable" class="table table-bordered">
                                <thead class="align-middle text-center">
                                    <tr class="table-primary">
                                        <th>教練編號</th>
                                        <th>教練姓名</th>
                                        <th>管理照片</th>
                                    </tr>
                                </thead>
                                <tbody class="align-middle text-center">
                                    <tr v-for="coach in allCoachs" :key="coach.employeeid">
                                        <td>{{ coach.employeeid }}</td>
                                        <td>{{ coach.employeename }}</td>
                                        <td><button type="submit" class="btn btn-outline-info" data-bs-toggle="modal"
                                                data-bs-target="#updateModal" @click="inputUpdateData(coach)">修改</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Paging :totalPages="totalPages" :thePage="datas.start + 1" @abcClick="clickHandler"></Paging>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModal" aria-hidden="true"
            data-bs-backdrop="static">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">修改後台帳戶</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            員工編號: {{ updateBackStageAccount.cpicid }}
                        </div>
                        <div class="mb-3">
                            員工姓名: {{ updateBackStageAccount.employeename }}
                        </div>
                        <div class="mb-3">
                            員工帳號: {{ updateBackStageAccount.employeeid }}
                        </div>
                        <div class="mb-3">
                            員工密碼(輸入即更改為新密碼 未輸入保持原樣):<input type="password" class="form-control"
                                v-model="updateBackStageAccount.cpicfile" @keyup="checkupdatepassword">
                            <span class="text-danger"></span>
                        </div>
                        <div class="mb-3">
                            確認密碼(輸入即更改為新密碼 未輸入保持原樣):<input type="password" class="form-control"
                                v-model="updateagainpassword.password" @keyup="checkupdatepassword">
                            <span v-if="!updateagainpassword.check" class="text-danger">密碼不相符</span><br>

                        </div>
                        <div class="mb-3">
                            權限等級:
                            <select v-model="updateBackStageAccount.loa">
                                <option v-for="loa in 5" :key="loa" :value="loa">{{ loa }}
                                </option>
                            </select>
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
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">新增後台帳戶</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            員工:
                            <select v-model="insertCoachPic.cpicid">
                                <option v-for="emp in allEmps" :key="emp.cpicid" :value="emp.cpicid">{{
                                    emp.cpicid + " " + emp.employeename }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            員工帳號:<input type="text" class="form-control" v-model="insertCoachPic.employeeid">
                            <span v-if="!insertCoachPic.employeeid" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            員工密碼:<input type="password" class="form-control"
                                v-model="insertCoachPic.cpicfile" @keyup="checkinsertpassword">
                            <span v-if="!insertCoachPic.cpicfile" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            確認密碼:<input type="password" class="form-control" v-model="insertagainpassword.password"
                                @keyup="checkinsertpassword">
                            <span v-if="!insertagainpassword.password" class="text-danger">必填</span><br>
                            <span v-if="!insertagainpassword.check" class="text-danger">密碼不相符</span>
                        </div>
                        <div class="mb-3">
                            權限等級:
                            <select v-model="insertCoachPic.loa">
                                <option v-for="loa in 5" :key="loa" :value="loa">{{ loa }}
                                </option>
                            </select>
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
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">刪除後台帳戶</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            員工編號: {{ deleteBackStageAccount.cpicid }}
                        </div>
                        <div class="mb-3">
                            員工姓名: {{ deleteBackStageAccount.employeename }}
                        </div>
                        <div class="mb-3">
                            員工帳號: {{ deleteBackStageAccount.employeeid }}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                        <button type="submit" class="btn btn-primary" @click="deleteData()">刪除</button>
                    </div>
                </div>
            </div>
        </div> -->
    </body>
</template>

<script setup>
import axios from 'axios';
import { ref, reactive, onMounted } from 'vue'
import NavbarTop from '../components/NavbarTop.vue'
import NavbarLeft from '../components/NavbarLeft.vue'
import Paging from "../components/Paging.vue";
import PageSize from "../components/PageSize.vue";
import SearchTextBox from '../components/SearchTextBox.vue'

const url = import.meta.env.VITE_API_JAVAURL
const insertCoachPic = reactive({
    cpicid: '',
    employeeid: '',
    cpicfile: '',
});



const updateCoachPic = reactive({});
const deleteBackStageAccount = reactive({});

const allCoachs = ref([])

const totalPages = ref(0);
const datas = reactive({
    start: 0,
    rows: 5,
    name: null,
    sortOrder: "asc",
    sortType: "id",
});

const loadDatas = async () => {
    const responseCoachs = await axios.post(`${url}/employees/findCoachPageByName`, datas)

    allCoachs.value = responseCoachs.data.list

    // 計算總共幾頁
    totalPages.value = +datas.rows === 0 ? 1 : Math.ceil(responseCoachs.data.count / datas.rows)

}

onMounted(() => {
    loadDatas()
});

//paging 由子元件觸發
const clickHandler = page => {
    datas.start = page - 1
    loadDatas()
}

//一頁幾筆資料
const changeHandler = value => {
    datas.rows = value
    datas.start = 0
    console.log("pagesize：", datas)
    loadDatas()
}

//排序
const sortHandler = type => {
    datas.sortOrder = datas.sortOrder === "asc" ? "desc" : "asc"
    datas.sortType = type
    loadDatas()
}

//搜尋
const inputHandler = value => {
    datas.name = value
    datas.start = 0
    loadDatas()
}


// 點擊修改時觸發 帶入該筆資料
const inputUpdateData = async (emp) => {
    Object.assign(updateCoachPic, emp);

    const responseCoachPics = await axios.get(`${url}/coachpics/byemp/${emp.employeeid}`)
    
    console.log(responseCoachPics)
    console.log(responseCoachPics.data)
};

// // 點擊刪除時觸發 帶入該筆資料
// const inputDeleteData = (data) => {
//     Object.assign(deleteBackStageAccount, data);
// };




// const insertData = async () => {
//     // //抓彈出視窗
//     var myModalEl = document.getElementById('insertModal')
//     var modal = bootstrap.Modal.getInstance(myModalEl)

//     // //如果沒有值 return 不做
//     if (!insertCoachPic.cpicid ||
//         !insertCoachPic.employeeid.trim() ||
//         !insertCoachPic.cpicfile ||
//         !insertCoachPic.loa) {
//         alert("請輸入資料")
//         return;
//     }

//     if (!insertagainpassword.check) {
//         return
//     }

//     // console.log(insertEmployee)
//     try {
//         const response = await axios.post(`${url}/backstageaccounts`, insertCoachPic)

//         if (response.status == 200) {
//             loadDatas(); // 重新載入資料
//             // Object.assign(insertEmployee,{})
//             // insertEmployee.value = ''; // 清空 insertDeptName
//             alert("新增成功")
//         }
//     } catch (error) {
//         console.log(error)
//         alert("新增失敗")
//     } finally {
//         //不管是否成功 modal切換
//         modal.toggle();
//         cleardata();
//     }
// }

// const updateData = async () => {
//     //抓彈出視窗
//     var myModalEl = document.getElementById('updateModal')
//     var modal = bootstrap.Modal.getInstance(myModalEl)

//     console.log(!updateBackStageAccount.cpicid)
//     console.log(!updateBackStageAccount.employeeid.trim())
//     console.log(!updateBackStageAccount.loa)

//     // delete updateEmployee.department
//     // delete updateEmployee.jobtitle

//     // //如果沒有值 return 不做
//     if (!updateBackStageAccount.cpicid ||
//         !updateBackStageAccount.employeeid.trim() ||
//         !updateBackStageAccount.loa) {
//         alert("請輸入正確資料")
//         return;
//     }

//     if (!updateagainpassword.check) {
//         return
//     }

//     // console.log("updateEmployee")
//     // console.log(updateEmployee)
//     try {
//         const response = await axios.put(`${url}/backstageaccounts/${updateBackStageAccount.employeeid}`, updateBackStageAccount)
//         console.log("test2")
//         if (response.status == 200) {
//             loadDatas(); // 重新載入資料
//             alert("修改成功")
//         }


//     } catch (error) {
//         console.log(error.response)
//         alert("修改失敗")
//     } finally {
//         //不管是否成功 modal切換
//         modal.toggle();
//         cleardata();
//     }
// }


// const deleteData = async () => {
//     //抓彈出視窗
//     var myModalEl = document.getElementById('deleteModal')
//     var modal = bootstrap.Modal.getInstance(myModalEl)

//     //如果沒有值 return 不做
//     try {
//         const response = await axios.delete(`${url}/backstageaccounts/${deleteBackStageAccount.employeeid}`)

//         if (response.status == 200) {
//             datas.start = 0;
//             datas.name = "";

//             loadDatas(); // 重新載入資料
//             alert("刪除成功")
//         }


//     } catch (error) {
//         console.log(error.response)
//         alert("刪除失敗")
//     } finally {
//         //不管是否成功 modal切換
//         modal.toggle();
//     }

// }

</script>