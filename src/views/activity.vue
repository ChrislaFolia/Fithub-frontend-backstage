<template>
    <div id="layoutSidenav">
        <div id="layoutSidenav_content">
            <div class="container-fluid px-4">
                <!-- 標題 -->
                <h1 class="mt-4" style="text-align: center;">全部活動</h1>
                <div class="card mb-4">
                    <div class="card-body table-responsive">
                        <button class="btn btn btn-primary" data-bs-toggle="modal" data-bs-target="#insertModal"
                            style="margin-bottom: 10px;">新增活動</button>
                        <table class="table table-bordered">
                            <thead class="align-middle text-center">
                                <tr class="table-primary">
                                    <th>
                                        <button class="btn btn-outline-danger" @click="deleteSelected">刪除</button>
                                    </th>
                                    <th>活動日期</th>
                                    <th>名稱</th>
                                    <th>內容</th>
                                    <th>網址</th>
                                    <th>顯示</th>
                                    <th>排序</th>
                                    <th>上架日期</th>
                                    <th>下架日期</th>
                                    <th>負責員工</th>
                                    <th>圖片</th>
                                    <th>修改</th>
                                </tr>
                            </thead>

                            <tbody class="align-middle text-center">
                                <tr v-for="(Activity, activityindex) in Activitys" :key="activityindex">
                                    <td><input type="checkbox" v-model="selectedActivities" :value="Activity.activityid">
                                    </td>
                                    <td>{{ Activity.activitydate }}</td>
                                    <td>{{ Activity.activityname }}</td>
                                    <td>{{ Activity.activitydescription }}</td>
                                    <td><a href="${Activity.activityurl}"><i class="fas fa-link"></i>連結</a></td>
                                    <td>{{ Activity.activitydisplay }}</td>
                                    <td>{{ Activity.activitysort }}</td>
                                    <td>{{ Activity.activityon }}</td>
                                    <td>{{ Activity.activityoff }}</td>
                                    <td>{{ Activity.employee.employeename }}</td>
                                    <td>
                                        <div v-for="(pic, picIndex) in Activity.activitypic" :key="picIndex"
                                            style="margin-bottom: 10px;">
                                            <img :src="pic.apicfile" style="width: 150px;height: 150px;" alt="維修中">
                                        </div>
                                    </td>

                                    <td><button class="btn btn-outline-secondary" data-bs-toggle="modal"
                                            @click="openUpdateModal(Activity)" data-bs-target="#updateModal">修改</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- 新增-彈出視窗 點擊表格外不關閉="static"  取消輸入聚焦在表格data-bs-focus="false"-->
    <div class="modal fade" id="insertModal" tabindex="-1" aria-labelledby="insertModal" aria-hidden="true"
        data-bs-backdrop="static" data-bs-focus="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">新增活動</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        日期<input v-model="Activity.activitydate" type="date" class="form-control">
                        <span v-if="!Activity.activitydate" class="text-danger">必填</span>
                    </div>
                    <div class="mb-3">
                        名稱<input v-model="Activity.activityname" type="text" class="form-control">
                        <span v-if="!Activity.activityname" class="text-danger">必填</span>
                    </div>
                    <div class="mb-3">
                        相關連結<input v-model="Activity.activityurl" type="text" class="form-control">
                        <span v-if="!Activity.activityurl" class="text-danger">必填</span>
                    </div>
                    顯示
                    <div class="mb-3">
                        <select v-model="Activity.activitydisplay" class="form-control">
                            <option value="是">是</option>
                            <option value="否">否</option>
                        </select>
                        <span v-if="!Activity.activitydisplay" class="text-danger">必填</span>
                    </div>
                    <div class="mb-3">
                        排序<input v-model="Activity.activitysort" type="text" class="form-control">
                        <span v-if="!Activity.activitysort" class="text-danger">必填</span>
                    </div>
                    <div class="mb-3">
                        上架日期<input v-model="Activity.activityon" type="date" class="form-control">
                        <span v-if="!Activity.activityon" class="text-danger">必填</span>
                    </div>
                    <div class="mb-3">
                        下架日期<input v-model="Activity.activityoff" type="date" class="form-control">
                        <span v-if="!Activity.activityoff" class="text-danger">必填</span>
                    </div>
                    負責員工
                    <div class="mb-3">
                        <select v-model="Activity.employeeid" class="form-control">
                            <option v-for="employeenameAndemployeeid in AllemployeenameAndemployeeid"
                                :value="employeenameAndemployeeid[1]">{{ employeenameAndemployeeid[0] }}</option>
                        </select>
                        <span v-if="!Activity.employeeid" class="text-danger">必填</span>
                    </div>
                    <div class="mb-3">
                        內容<br>
                        <textarea id="editor" v-model="Activity.activitydescription"></textarea>
                        <!-- <div id="editor"></div> -->
                        <span v-if="!Activity.activitydescription" class="text-danger">必填</span>
                    </div>
                    <div class="mb-3">
                        活動圖片
                        <input id="insertfile" type="file" class="form-control" accept="image/*" multiple
                            @change="imageInsert">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary" @click="insertActivity">送出</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import axios from 'axios'
import { reactive, ref, onMounted } from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


//建立活動物件
const Activity = reactive({
    activitydate: '',
    activitydescription: '',
    activityname: '',
    activitydisplay: '',
    activityoff: '',
    activityon: '',
    activitysort: '',
    activityurl: '',
    employeeid: '',
    pic: [],
});

const Activitys = ref([]); // 儲存SelectAll的活動
const AllemployeenameAndemployeeid = ref([]);
const selectedActivities = ref([]); // 儲存選中的 ClassroomID
const updateSelectedActivities = reactive({}); // 儲存要修改的教室資料(預設值)
let editor = ref(null); //文字編輯器



// 将選中的教室資料複製到 updateSelectedClassroom
const openUpdateModal = (Activity) => {
    Object.assign(updateSelectedActivities, Activity);

    //清空上傳圖片欄位
    let updatefile = document.querySelector('#updatefile')
    updatefile.value = '';
};

// 取得圖片轉為 BASE64(insert)
const imageInsert = (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = (event) => {
                const base64Data = event.target.result;

                // 將 base64Data 直接塞入 activitypic 陣列中的物件
                Activity.pic.push(base64Data);
            };
        }
    }
};

// 從伺服器獲取 JSON 格式教室資料
const getActivitys = async () => {
    try {
        const response = await axios.get('http://localhost:8080/fithub/activity/list'); // 替換為實際的 API URL
        Activitys.value = response.data; //data為response物件的屬性，通常是返回的JSON格式資料
        console.log(Activitys.value)

    } catch (error) {
        console.error('Error getclassroom data:', error);
    }
};

const getAllemployeenameAndemployeeid = async () => {
    try {
        const response = await axios.get('http://localhost:8080/fithub/activity/findAllemployeenameAndemployeeid'); // 替換為實際的 API URL
        AllemployeenameAndemployeeid.value = response.data; //data為response物件的屬性，通常是返回的JSON格式資料
        console.log(AllemployeenameAndemployeeid.value)

    } catch (error) {
        console.error('Error getclassroom data:', error);
    }
};

// 新增活動
const insertActivity = async () => {
    try {
        const editorContent = editor.getData();
        Activity.activitydescription = editorContent;

        // 检查是否有任何必填字段为空
        if (!Activity.activitydate ||
            !Activity.activityname ||
            !Activity.activitydisplay ||
            !Activity.activityoff ||
            !Activity.activityon ||
            !Activity.activitysort ||
            !Activity.activityurl ||
            !Activity.employeeid) {
            return;
        }

        const response = await axios.post('http://localhost:8080/fithub/activity/insert', Activity, {
            headers: {
                'Content-Type': 'application/json'
            }
        });



        // 關閉動態框
        // const insertModal = document.getElementById('insertModal')
        // let getInstanceInsertModal = bootstrap.Modal.getInstance(insertModal)
        // getInstanceInsertModal.toggle();

        // 清空輸入的值
        // Activity.activitydate = ''
        // Activity.activitydescription = ''
        // Activity.activityname = ''
        // Activity.activitydisplay = ''
        // Activity.activityoff = ''
        // Activity.activityon = ''
        // Activity.activitysort = ''
        // Activity.activityurl = ''
        // Activity.employeeid = ''
        // let insertfile = document.querySelector('#insertfile')
        // insertfile.value = '';

        // 刷新畫面
        // getActivitys();
    } catch (error) {
        console.error('Error adding new Activity:', error);
    }
};


// // 刪除多筆教室
const deleteSelected = async () => {

    const checkDelete = window.confirm('確定要刪除選中的活動嗎？');
    if (checkDelete) {
        try {
            // 將選中的 ClassroomID 送到後端進行刪除
            const response = await axios.delete('http://localhost:8080/fithub/activity/delete/multiple', {
                data: selectedActivities.value
            });

            // 刷新資料
            getActivitys();
            selectedActivities.value = []; // 清空選中的項目
        } catch (error) {
            console.error('Error deleting rent orders:', error);
        }
    }
};

onMounted(() => {
    getActivitys();
    getAllemployeenameAndemployeeid();
    //建立文字編輯器
    ClassicEditor
        .create(document.querySelector('#editor'))
        .then(newEditor => {
            //將DOM取得的editor賦與宣告的變數提供訪問方法和屬性
            editor = newEditor;
        })
        .catch(error => {
            console.error(error);
        });
});

</script>

<style >
.text-danger {
    font-size: 8px;
}

/* 調整文字編輯器樣式 */
.ck-editor__editable {
    min-height: 400px;
}

/* 調整文字編輯器URL按鈕(focus) */
body {
    --ck-z-default: 100;
    --ck-z-modal: calc(var(--ck-z-default) + 999);
}
</style>