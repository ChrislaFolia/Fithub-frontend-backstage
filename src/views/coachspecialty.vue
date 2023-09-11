<template>
    <body class="sb-nav-fixed">
        <NavbarTop></NavbarTop>
        <NavbarLeft></NavbarLeft>


        <div id="layoutSidenav">
            <div id="layoutSidenav_content">
                <div class="container-fluid px-4">
                    <h1 class="mt-4" style="text-align: center;">專長項目</h1>
                    <div class="card mb-4">
                        <div class="card-body table-responsive">
                            <button type="submit" class="btn btn-outline-info" data-bs-toggle="modal"
                                data-bs-target="#insertModal">新增專長</button>
                            <table id="specialtysTable" class="table table-bordered">
                                <thead class="align-middle text-center">
                                    <tr class="table-primary">
                                        <th>教練名稱</th>
                                        <th>專長</th>
                                        <th>修改</th>
                                        <th>刪除</th>
                                    </tr>
                                </thead>
                                <tbody class="align-middle text-center">
                                    <tr v-for="coachSpec in allCoachSpecs" :key="coachSpec.specialtyid">
                                        <td>{{ coachSpec.employee.employeename }}</td>
                                        <td>{{ coachSpec.specialty.specialtyname }}</td>
                                        <td><button type="submit" class="btn btn-outline-info" data-bs-toggle="modal"
                                                data-bs-target="#updateModal" @click="inputUpdateData(coachSpec)">修改</button>
                                        </td>
                                        <td><button type="submit" class="btn btn-outline-info" data-bs-toggle="modal"
                                                data-bs-target="#deleteModal" @click="inputDeleteData(coachSpec)">刪除</button>
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
                        <h5 class="modal-title" id="exampleModalLabel">修改專長</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            教練名稱:
                            <input type="text" class="form-control" v-model="updateCoachSpecialtyEmployee.employeename" readonly>
                            <span v-if="!updateCoachSpecialty.employeeid" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            專長名稱:
                            <select v-model="updateCoachSpecialty.specialtyid">
                                <option v-for="spec in allSpecs" :key="spec.specialtyid"
                                    :value="spec.specialtyid">{{ spec.specialtyname }}
                                </option>
                            </select>
                            <span v-if="!updateCoachSpecialty.specialtyid" class="text-danger">必填</span>
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
                        <h5 class="modal-title" id="exampleModalLabel">新增專長</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            教練名稱:
                            <select v-model="insertCoachSpecialty.employeeid">
                                <option v-for="coach in allCoachs" :key="coach.employeeid"
                                    :value="coach.employeeid">{{ coach.employeename }}
                                </option>
                            </select>
                            <span v-if="!insertCoachSpecialty.employeeid" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            專長名稱:
                            <select v-model="insertCoachSpecialty.specialtyid">
                                <option v-for="spec in allSpecs" :key="spec.specialtyid"
                                    :value="spec.specialtyid">{{ spec.specialtyname }}
                                </option>
                            </select>
                            <span v-if="!insertCoachSpecialty.specialtyid" class="text-danger">必填</span>
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
                        <h5 class="modal-title" id="exampleModalLabel">刪除專長</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            教練名稱:
                            <input type="text" class="form-control" v-model="deleteCoachSpecialtyEmployee.employeename" readonly>
                            <span v-if="!deleteCoachSpecialty.employeeid" class="text-danger">必填</span>
                        </div>
                        <div class="mb-3">
                            專長名稱:
                            <input type="text" class="form-control" v-model="deleteCoachSpecialtySpecialty.specialtyname" readonly>
                            <span v-if="!deleteCoachSpecialty.specialtyid" class="text-danger">必填</span>
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
const insertCoachSpecialty = reactive({
    employeeid: '',
    specialtyid: '',
});
const updateCoachSpecialty = reactive({});
const updateCoachSpecialtyEmployee = reactive({});


const deleteCoachSpecialty = reactive({});
const deleteCoachSpecialtyEmployee = reactive({});
const deleteCoachSpecialtySpecialty = reactive({});

//存所有dept資料
const allCoachSpecs = ref([])
const allSpecs = ref([])
const allCoachs = ref([])

const loadDatas = async () => {
    //透過get方法呼叫/products/find 傳datas資料

    const responseCoachSpecialtys = await axios.get(`${url}/coachspecialtys`)
    const responseSpecialtys = await axios.get(`${url}/specialtys`)
    const responseCoachs = await axios.get(`${url}/employees/coachs`)

    allCoachSpecs.value = responseCoachSpecialtys.data
    allSpecs.value = responseSpecialtys.data
    allCoachs.value = responseCoachs.data


}

onMounted(() => {
    loadDatas()
});

const inputUpdateData = (data) => {
    Object.assign(updateCoachSpecialty, data);
    Object.assign(updateCoachSpecialtyEmployee, data.employee);
};

const inputDeleteData = async (data) => {
    await Object.assign(deleteCoachSpecialty, data);
    await Object.assign(deleteCoachSpecialtyEmployee, data.employee);
    await Object.assign(deleteCoachSpecialtySpecialty, data.specialty);
};



const insertData = async () => {
    //抓彈出視窗
    var myModalEl = document.getElementById('insertModal')
    var modal = bootstrap.Modal.getInstance(myModalEl)

    //如果沒有值 return 不做
    if (!insertCoachSpecialty.employeeid || !insertCoachSpecialty.specialtyid) {
        alert("請輸入正確資料")
        return;
    }

    try {
        const response = await axios.post(`${url}/coachspecialtys`, { employeeid: insertCoachSpecialty.employeeid , specialtyid: insertCoachSpecialty.specialtyid})
        if (response.status === 200) {
            loadDatas(); // 重新載入資料
            insertCoachSpecialty.specialtyid = ''; // 清空 insertCoachSpecialtyid
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
    if (!updateCoachSpecialty.specialtyid) {
        alert("請輸入正確資料")
        return;
    }


    try {
        const response = await axios.put(`${url}/coachspecialtys/${updateCoachSpecialty.coachspecialtyid}`, { coachspecialtyid: updateCoachSpecialty.coachspecialtyid, employeeid: updateCoachSpecialty.employeeid, specialtyid: updateCoachSpecialty.specialtyid })

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
    if (!deleteCoachSpecialty.coachspecialtyid) {
        return;
    }

    try {
        const response = await axios.delete(`${url}/coachspecialtys/${deleteCoachSpecialty.coachspecialtyid}`)

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