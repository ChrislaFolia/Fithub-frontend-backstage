<template>
    <body class="sb-nav-fixed">
        <NavbarTop></NavbarTop>
        <NavbarLeft></NavbarLeft>

        <div id="layoutSidenav">
            <div id="layoutSidenav_content">
                <div class="container-fluid px-4">
                    <h1 class="mt-4" style="text-align: center;">員工資料</h1>
                    <div class="card mb-4">
                        <div class="card-body table-responsive">
                            <button type="submit" class="btn btn-outline-info" data-bs-toggle="modal"
                                data-bs-target="#insertModal">新增員工</button>
                            <table id="departmentsTable" class="table table-bordered">
                                <thead class="align-middle text-center">
                                    <tr class="table-primary">
                                        <th>員工編號</th>
                                        <th>姓名</th>
                                        <th>性別</th>
                                        <th>電話</th>
                                        <th>信箱</th>
                                        <th>職稱</th>
                                        <th>編輯</th>
                                        <th>刪除</th>
                                    </tr>
                                </thead>
                                <tbody class="align-middle text-center">
                                    <tr v-for="data in datas" :key="data.employeeid">
                                        <td>{{ data.employeeid }}</td>
                                        <td>{{ data.employeename }}</td>
                                        <td>{{ data.employeegender }}</td>
                                        <td>{{ data.employeephone }}</td>
                                        <td>{{ data.employeeemail }}</td>
                                        <td>{{ data.jobtitle.jobtitlename }}</td>
                                        <td><button type="submit" class="btn btn-outline-info" data-bs-toggle="modal"
                                                data-bs-target="#updateModal" @click="inputUpdateData(data)">修改</button>
                                        </td>
                                        <td><button type="submit" class="btn btn-outline-info" data-bs-toggle="modal"
                                                data-bs-target="#deleteModal" @click="inputDeleteData(data)">刪除</button>
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
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">修改員工資料</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            員工編號:<input type="text" class="form-control" v-model="updateEmployee.employeeid" readonly>
                            <span v-if="!updateEmployee.employeeid" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            姓名:<input type="text" class="form-control" v-model="updateEmployee.employeename">
                            <span v-if="!updateEmployee.employeename" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            電話:<input type="text" class="form-control" v-model="updateEmployee.employeephone">
                            <span v-if="!updateEmployee.employeephone" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            性別:<input type="text" class="form-control" v-model="updateEmployee.employeegender">
                            <span v-if="!updateEmployee.employeegender" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            縣市:<input type="text" class="form-control" v-model="updateEmployee.employeecity">
                            <span v-if="!updateEmployee.employeecity" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            地區:<input type="text" class="form-control" v-model="updateEmployee.employeezone">
                            <span v-if="!updateEmployee.employeezone" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            地址:<input type="text" class="form-control" v-model="updateEmployee.employeeaddress">
                            <span v-if="!updateEmployee.employeeaddress" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            部門:
                            <select v-model="updateEmployee.deptid">
                                <option v-for="dept in allDepts" :key="dept.deptid" :value="dept.deptid">{{ dept.deptname }}
                                </option>
                            </select>
                            <span v-if="!updateEmployee.deptid" class="text-danger">必填</span>
                        </div>
                        
                        <div class="mb-3">
                            職稱:
                            <select v-model="updateEmployee.jobtitleid">
                                <option v-for="jobtitle in allJobTitles" :key="jobtitle.jobtitleid" :value="jobtitle.jobtitleid">{{ jobtitle.jobtitlename }}
                                </option>
                            </select>
                            <span v-if="!updateEmployee.jobtitleid" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            主管:<input type="text" class="form-control" v-model="updateEmployee.managerid">
                        </div>
                        <div class="mb-3">
                            入職時間:<input type="date" class="form-control" v-model="updateEmployee.hiredate">
                            <span v-if="!updateEmployee.hiredate" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            離職時間:<input type="date" class="form-control" v-model="updateEmployee.resigndate">
                        </div>
                        <div class="mb-3">
                            薪資:<input type="text" class="form-control" v-model="updateEmployee.salary">
                            <span v-if="!updateEmployee.salary" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            生日:<input type="date" class="form-control" v-model="updateEmployee.employeebirthday">
                            <span v-if="!updateEmployee.employeebirthday" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            簡介:<textarea class="form-control" v-model="updateEmployee.employeeintroduction"></textarea>
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
                        <h5 class="modal-title" id="exampleModalLabel">新增員工</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            姓名:<input type="text" class="form-control" v-model="insertEmployee.employeename">
                            <span v-if="!insertEmployee.employeename" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            電話:<input type="text" class="form-control" v-model="insertEmployee.employeephone">
                            <span v-if="!insertEmployee.employeephone" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            性別:<select v-model="insertEmployee.employeegender" id="gender">
                                <option value="男">男</option>
                                <option value="女">女</option>
                            </select>
                        </div>
                        <span v-if="!insertEmployee.employeegender" class="text-danger">必填</span>
                        <div class="mb-3">
                            縣市:<input type="text" class="form-control" v-model="insertEmployee.employeecity">
                            <span v-if="!insertEmployee.employeecity" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            地區:<input type="text" class="form-control" v-model="insertEmployee.employeezone">
                            <span v-if="!insertEmployee.employeezone" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            地址:<input type="text" class="form-control" v-model="insertEmployee.employeeaddress">
                            <span v-if="!insertEmployee.employeeaddress" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            部門:
                            <select v-model="insertEmployee.deptid">
                                <option v-for="dept in allDepts" :key="dept.deptid" :value="dept">{{ dept.deptname }}
                                </option>
                            </select>
                            <span v-if="!insertEmployee.deptid" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            職稱:
                            <select v-model="insertEmployee.jobtitleid">
                                <option v-for="jobtitle in allJobTitles" :key="jobtitle.jobtitleid" :value="jobtitle.jobtitleid">{{ jobtitle.jobtitlename }}
                                </option>
                            </select>
                            <span v-if="!insertEmployee.jobtitleid" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            主管:<input type="text" class="form-control" v-model="insertEmployee.managerid">
                        </div>
                        <div class="mb-3">
                            入職時間:<input type="date" class="form-control" v-model="insertEmployee.hiredate">
                            <span v-if="!insertEmployee.hiredate" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            離職時間:<input type="date" class="form-control" v-model="insertEmployee.resigndate">
                        </div>
                        <div class="mb-3">
                            薪資:<input type="text" class="form-control" v-model="insertEmployee.salary">
                            <span v-if="!insertEmployee.salary" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            生日:<input type="date" class="form-control" v-model="insertEmployee.employeebirthday">
                            <span v-if="!insertEmployee.employeebirthday" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            簡介:<textarea class="form-control" v-model="insertEmployee.employeeintroduction"></textarea>
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
            <div class="modal-dialog modal-dialog-scrollable" >
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">刪除部門</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <!-- 部門名稱:<input type="text" class="form-control" v-model="deleteDeptName" readonly> -->
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                        <button type="submit" class="btn btn-primary" @click="deleteDept()">刪除</button>
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
const insertEmployee = reactive({
    employeename: '',
    employeeemail: '',
    employeephone: '',
    employeegender: '',
    employeecity: '',
    employeezone: '',
    employeeaddress: '',
    deptid: '',
    jobtitleid: '',
    managerid: '',
    hiredate: '',
    resigndate: '',
    salary: '',
    employeebirthday: '',
    employeeintroduction: '',
});

const updateEmployee = reactive({});
const deleteEmployee = reactive({});

//載入所有dept資料
const datas = ref([])
const allDepts = ref([])
const allJobTitles = ref([])

const loadDatas = async () => {
    //透過get方法呼叫/products/find 傳datas資料

    const response = await axios.get(`${url}/employees`)
    const responseDept = await axios.get(`${url}/departments`)
    const responseJobTitle = await axios.get(`${url}/jobtitles`)

    datas.value = response.data
    allDepts.value = responseDept.data
    allJobTitles.value = responseJobTitle.data
}

onMounted(() => {
    loadDatas()
});

// 點擊修改時觸發 帶入該筆資料
const inputUpdateData = (data) => {
    Object.assign(updateEmployee, data);
    console.log(updateEmployee)
    console.log(updateEmployee.deptid)
    console.log(updateEmployee.department)

};

// 點擊刪除時觸發 帶入該筆資料
const inputDeleteData = (data) => {
    Object.assign(deleteEmployee, data);
};



const insertDept = async () => {
    console.log(insertEmployee.employeegender)
    console.log(insertEmployee.deptid)
    console.log(insertEmployee.hiredate)
    console.log(insertEmployee.resigndate)
    // //抓彈出視窗
    // var myModalEl = document.getElementById('insertModal')
    // var modal = bootstrap.Modal.getInstance(myModalEl)

    // //如果沒有值 return 不做
    // if (!insertEmployee.employeename.trim() ||
    //     !insertEmployee.employeeemail.trim() ||
    //     !insertEmployee.employeephone.trim() ||
    //     !insertEmployee.employeegender.trim() ||
    //     !insertEmployee.employeecity.trim() ||
    //     !insertEmployee.employeezone.trim() ||
    //     !insertEmployee.employeeaddress.trim() ||
    //     !insertEmployee.deptid.trim() ||
    //     !insertEmployee.jobtitleid.trim() ||
    //     !insertEmployee.managerid.trim() ||
    //     !insertEmployee.hiredate.trim() ||
    //     !insertEmployee.salary.trim() ||
    //     !insertEmployee.employeebirthday.trim()
    // ) {
    //     return;
    // }

    // try {

    //     const response = await axios.post(`${url}/departments`, { deptname: insertDeptName.value })

    //     if (response.status == 200) {
    //         loadDatas(); // 重新載入資料
    //         insertDeptName.value = ''; // 清空 insertDeptName
    //         alert("新增成功")
    //     }
    // } catch (error) {
    //     alert("新增失敗")
    // } finally {
    //     //不管是否成功 modal切換
    //     modal.toggle();
    // }
}

const updateData = async () => {
    //抓彈出視窗
    var myModalEl = document.getElementById('updateModal')
    var modal = bootstrap.Modal.getInstance(myModalEl)

    // console.log(updateEmployee.department.deptname)

    // console.log(!updateEmployee.employeename.trim())
    // console.log(!updateEmployee.employeeemail.trim())
    // console.log(!updateEmployee.employeephone.trim())
    // console.log(!updateEmployee.employeegender.trim())
    // console.log( !updateEmployee.employeecity.trim())
    // console.log( !updateEmployee.employeezone.trim())
    // console.log(!updateEmployee.employeeaddress.trim())
    // console.log( !updateEmployee.deptid )
    // console.log( !updateEmployee.jobtitleid.trim())
    // console.log(!updateEmployee.hiredate.trim())
    // console.log(!updateEmployee.salary)
    // console.log( !updateEmployee.employeebirthday.trim())
    delete updateEmployee.department
    delete updateEmployee.jobtitle

    //如果沒有值 return 不做
    if (!updateEmployee.employeename.trim() ||
        !updateEmployee.employeeemail.trim() ||
        !updateEmployee.employeephone.trim() ||
        !updateEmployee.employeegender.trim() ||
        !updateEmployee.employeecity.trim() ||
        !updateEmployee.employeezone.trim() ||
        !updateEmployee.employeeaddress.trim() ||
        !updateEmployee.deptid ||
        !updateEmployee.jobtitleid.trim() ||
        !updateEmployee.hiredate.trim() ||
        !updateEmployee.salary ||
        !updateEmployee.employeebirthday.trim()) {
        console.log("test")
        return;
    }

    console.log("updateEmployee")
    console.log(updateEmployee)
    try {
        const response = await axios.put(`${url}/employees/${updateEmployee.employeeid}`, updateEmployee)
        console.log("test2")
        if (response.status == 200) {
            loadDatas(); // 重新載入資料
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
            loadDatas(); // 重新載入資料
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