<template>
    <div id="layoutSidenav">
        <div id="layoutSidenav_content">
            <div class="container-fluid px-4">
                <h1 class="mt-4" style="text-align: center;">優惠券</h1>
                <div class="card mb-4">
                    <div class="card-body table-responsive">
                        <button class="btn btn btn-primary" data-bs-toggle="modal" data-bs-target="#insertModal"
                            style="margin-bottom: 10px;">新增優惠券</button>
                        <table class="table table-bordered">
                            <thead class="align-middle text-center">
                                <tr class="table-primary">
                                    <th>
                                        <button class="btn btn-outline-danger" @click="deleteSelected">刪除</button>
                                    </th>
                                    <th>優惠券名稱</th>
                                    <th>優惠碼</th>
                                    <th>有效日期</th>
                                    <th>使用門檻</th>
                                    <th>優惠券折扣</th>
                                    <th>已使用/可使用</th>
                                    <th>修改</th>
                                </tr>
                            </thead>

                            <tbody class="align-middle text-center">
                                <tr v-for="(coupon, couponindex) in coupons" :key="couponindex">
                                    <td><input type="checkbox" v-model="selectedCoupons" :value="coupon.couponId">
                                    </td>
                                    <td>{{ coupon.couponname }}</td>
                                    <td>{{ coupon.couponcode }}</td>
                                    <td>{{ coupon.coupongeneratedate }}至{{ coupon.couponenddate }}</td>
                                    <td>{{ coupon.couponthreshold }}</td>
                                    <td>{{ coupon.coupondiscount }}</td>
                                    <td>{{ coupon.couponused }}</td>

                                    
                                    <!-- <td><button class="btn btn-outline-info" data-bs-toggle="modal"
                                            @click="openUpdateModal(classroom)" data-bs-target="#updateModal">修改</button>
                                    </td> -->
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 修改-彈出視窗 -->
    <!-- <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">更新教室</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        教室名稱<input v-model="updateSelectedClassroom.classroomName" type="text" class="form-control">
                        <span v-if="!updateSelectedClassroom.classroomName" class="text-danger">必填</span>
                    </div>
                    <div class="mb-3">
                        容納人數<input v-model="updateSelectedClassroom.classroomCapacity" type="text" class="form-control">
                        <span v-if="!updateSelectedClassroom.classroomCapacity" class="text-danger">必填</span>
                    </div>
                    <div class="mb-3">
                        設備介紹<input v-model="updateSelectedClassroom.classroomDescription" type="text" class="form-control">
                        <span v-if="!updateSelectedClassroom.classroomDescription" class="text-danger">必填</span>
                    </div>
                    <div class="mb-3">
                        租借價格<input v-model="updateSelectedClassroom.classroomPrice" type="text" class="form-control">
                        <span v-if="!updateSelectedClassroom.classroomPrice" class="text-danger">必填</span>
                    </div>
                    教室狀態
                    <div class="mb-3">
                        <select v-model="updateSelectedClassroom.classroomStatus" class="form-control">
                            <option value="開放">開放</option>
                            <option value="關閉">關閉</option>
                            <option value="維修中">維修中</option>
                        </select>
                        <span v-if="!updateSelectedClassroom.classroomStatus" class="text-danger">必填</span>
                    </div>
                    <div class="mb-3">
                        教室圖片:
                        <input id="insertfile" type="file" class="form-control" accept="image/*" @change="imageUpdate">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary" @click="updateClassroom">送出</button>
                </div>
            </div>
        </div>
    </div> -->


    <!-- 新增-彈出視窗 -->
    <!-- <div class="modal fade" id="insertModal" tabindex="-1" aria-labelledby="insertModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">新增教室</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        教室名稱<input v-model="classroom.classroomName" type="text" class="form-control">
                        <span v-if="!classroom.classroomName" class="text-danger">必填</span>
                    </div>
                    <div class="mb-3">
                        容納人數<input v-model="classroom.classroomCapacity" type="text" class="form-control">
                        <span v-if="!classroom.classroomCapacity" class="text-danger">必填</span>
                    </div>
                    <div class="mb-3">
                        設備介紹<input v-model="classroom.classroomDescription" type="text" class="form-control">
                        <span v-if="!classroom.classroomDescription" class="text-danger">必填</span>
                    </div>
                    <div class="mb-3">
                        租借價格<input v-model="classroom.classroomPrice" type="text" class="form-control">
                        <span v-if="!classroom.classroomPrice" class="text-danger">必填</span>
                    </div>
                    教室狀態
                    <div class="mb-3">
                        <select v-model="classroom.classroomStatus" class="form-control">
                            <option value="開放">開放</option>
                            <option value="關閉">關閉</option>
                            <option value="維修中">維修中</option>
                        </select>
                        <span v-if="!classroom.classroomStatus" class="text-danger">必填</span>
                    </div>
                    <div class="mb-3">
                        教室圖片:
                        <input id="insertfile" type="file" class="form-control" accept="image/*" @change="imageInsert">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary" @click="insertClassroom">送出</button>
                </div>
            </div>
        </div>
    </div> -->
</template>
  
<script setup>
import axios from 'axios'
import { reactive, ref, onMounted } from 'vue'

//建立優惠券物件
const coupon = reactive(
    {
    couponcategoriesid: '',
    couponname : '',
    couponstate: '',
    coupongeneratedate: '',
    couponenddate: '',
    couponcode: '',
    couponamount: '',
    couponceil: '',
    coupondiscount: '',
    couponused: '',
    couponthreshold: '',
});

const coupons = ref([]); // 儲存SelectAll的教室
const selectedCoupons = ref([]); // 儲存選中的 ClassroomID
const updateSelectedClassroom = reactive({}); // 儲存要修改的教室資料(預設值)

// 将選中的教室資料複製到 updateSelectedClassroom
const openUpdateModal = (classroom) => {
    Object.assign(updateSelectedClassroom, classroom);
};

// 取得圖片轉為BASE64
const imageInsert = (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
            const base64Data = event.target.result;
            classroom.classroomPic = base64Data;
        };
    }
};

// 取得圖片轉為BASE64
const imageUpdate = (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
            const base64Data = event.target.result;
            updateSelectedClassroom.classroomPic = base64Data;
        };
    }
};


// 從伺服器獲取 JSON 格式優惠券資料
const getcoupons = async () => {
    try {
        const response = await axios.get('http://localhost:8080/fithub/coupons'); // 替換為實際的 API URL
        coupons.value = response.data; //data為response物件的屬性，通常是返回的JSON格式資料
        console.log(coupons.value)

    } catch (error) {
        console.error('Error getcoupons data:', error);
    }
};

// // 新增教室
// const insertClassroom = async () => {
//     try {
//         // 检查是否有任何必填字段为空
//         if (!classroom.classroomName ||
//             !classroom.classroomCapacity ||
//             !classroom.classroomDescription ||
//             !classroom.classroomPrice ||
//             !classroom.classroomStatus) {
//             return;
//         }


//         const response = await axios.post('http://localhost:8080/fithub/classroom/insert', classroom, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });


//         //關閉動態框
//         const insertModal = document.getElementById('insertModal')
//         let getInstanceInsertModal = bootstrap.Modal.getInstance(insertModal)
//         getInstanceInsertModal.toggle();

//         // 清空輸入的值
//         classroom.classroomName = '';
//         classroom.classroomCapacity = '';
//         classroom.classroomDescription = '';
//         classroom.classroomPrice = '';
//         classroom.classroomStatus = '';
//         classroom.classroomPic = '';
//         let insertfile = document.querySelector('#insertfile')
//         insertfile.value = '';

//         // 刷新畫面
//         getclassrooms();
//     } catch (error) {
//         console.error('Error adding new classroom:', error);
//     }
// };

// // 更新教室
// const updateClassroom = async () => {
//     try {
//         // 检查是否有任何必填字段为空
//         if (!updateSelectedClassroom.classroomName ||
//             !updateSelectedClassroom.classroomCapacity ||
//             !updateSelectedClassroom.classroomDescription ||
//             !updateSelectedClassroom.classroomPrice ||
//             !updateSelectedClassroom.classroomStatus) {
//             return;
//         }


//         const response = await axios.put('http://localhost:8080/fithub/classroom/update', updateSelectedClassroom, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });


//         //關閉動態框
//         const updateModal = document.getElementById('updateModal')
//         let getInstanceUpdateModal = bootstrap.Modal.getInstance(updateModal)
//         getInstanceUpdateModal.toggle();

//         // 刷新畫面
//         getclassrooms();
//     } catch (error) {
//         console.error('Error adding new classroom:', error);
//     }
// };

// 刪除多筆教室
const deleteSelected = async () => {

    const checkDelete = window.confirm('確定要刪除選中的教室嗎？');
    if (checkDelete) {
        try {
            // 將選中的 ClassroomID 送到後端進行刪除
            const response = await axios.delete('http://localhost:8080/fithub/coupons/delete/multiple', {
                data: selectedCoupons.value
            });

            // 刷新資料
            getcoupons();
            selectedCoupons.value = []; // 清空選中的項目
        } catch (error) {
            console.error('Error deleting rent orders:', error);
        }
    }
};

onMounted(() => {
    getcoupons();
});
</script>

<style scoped>
.text-danger {
    font-size: 8px;
}
</style>