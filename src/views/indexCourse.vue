<template>
    <div id="layoutSidenav">
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4 mb-2" style="text-align: center;">全部課程</h1>

                    <div class="card mb-4">
                        <div class="card-body table-responsive">
                            <div class="mb-3">
                                <button type="button" id="insertCourse" class="btn btn btn-primary mb-1"
                                    data-bs-toggle="modal" data-bs-target="#insertModal">新增課程資料</button>
                            </div>
                            <InsertCourse :allCourseCategories="allCourseCategories"
                                @submitInsertCourse-emit="loadCourses()"></InsertCourse>
                            <table class="table table-bordered">
                                <thead class="align-middle text-center">
                                    <tr class="table-primary">
                                        <th>建立課堂</th>
                                        <th>課程分類</th>
                                        <th>課程名稱</th>
                                        <th>課程圖片</th>
                                        <th>課程描述</th>
                                        <th>修改</th>
                                        <th>刪除</th>
                                    </tr>
                                </thead>
                                <tbody class="align-middle text-center">
                                    <tr v-for=" { courseId, courseName, courseCategories, courseImgPath, courseDescription }  in   courses  "
                                        :key="courseId">
                                        <td>
                                            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
                                                :data-bs-target="`#insertClassesModal${courseId}`">
                                                <i class="bi bi-plus"></i>
                                            </button>
                                            <InsertClass class="text-left" :courseId="courseId" :courseName="courseName">
                                            </InsertClass>
                                        </td>
                                        <td>{{ courseCategories.categoryName }} </td>
                                        <td>{{ courseName }}</td>
                                        <td>
                                            <button type="button" class="btn btn-secondary btn-sm" data-bs-toggle="modal"
                                                :data-bs-target="`#staticBackdropPic${courseId}`">
                                                檢視圖片
                                            </button>
                                            <courseImg :parentId="courseId" :parentImgName="courseName"
                                                :parentImgPath="courseImgPath" modalTitle="課程圖片"></courseImg>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-secondary btn-sm" data-bs-toggle="modal"
                                                :data-bs-target="`#staticBackdrop${courseId}`">
                                                詳細內容
                                            </button>
                                            <courseDescription :parentId="courseId" :parentDescription="courseDescription"
                                                modalTitle="課程描述">
                                            </courseDescription>
                                        </td>
                                        <td>
                                            <button :id="`getUpdateCourseBtn${courseId}}`"
                                                class=" btn btn-outline-secondary btn-sm" data-bs-toggle="modal"
                                                :data-bs-target="`#updateModal${courseId}`">修改
                                            </button>
                                            <UpdateCourse :categories="courseCategories" :courseId="courseId"
                                                :courseName="courseName" :courseImgPath="courseImgPath"
                                                :courseCategories="courseCategories" :courseDescription="courseDescription"
                                                :allCourseCategories="allCourseCategories">
                                            </UpdateCourse>
                                        </td>
                                        <td>
                                            <button @click="deleteCourse(`${courseId}`, `${courseName}`)"
                                                class="btn btn-outline-danger btn-sm">刪除
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    </div>
</template>
    
<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import InsertCourse from '../components/course/courseInsertModal.vue';
import UpdateCourse from '../components/course/courseUpdateModal.vue'
import InsertClass from '../components/classes/classesInsertModal.vue'
import courseImg from '../components/util/imageModal.vue';
import courseDescription from '../components/util/textModal.vue';
const totalPages = ref(0);
const datas = reactive({
    start: 0,
    rows: 0,
    name: "",
    sortOrder: "asc",
    sortType: "id",
});

// Load course data
const courses = ref([]);
const URL = import.meta.env.VITE_API_JAVAURL;
const loadCourses = async () => {
    const URLAPI = `${URL}/course/findAll`;
    const response = await axios.get(URLAPI, datas);
    // console.log(response.data)

    //取得所有課程放進courses變數
    courses.value = response.data;
    console.log(courses)
    //計算總共幾頁
    totalPages.value = +datas.rows === 0 ? 1 : Math.ceil(response.data.count / datas.rows)
};

// Load courseCategories data
const allCourseCategories = ref([]);
const loadAllCourseCategories = async () => {
    const URLAPI = `${URL}/coursecategories/findAll`;
    const response = await axios.get(URLAPI);
    // console.log(response.data)

    //取得所有分類放進allCourseCategories變數
    allCourseCategories.value = response.data;
    // console.log(allCourseCategories)

};


// deleteCourse
const deleteCourse = async (courseId, courseName) => {
    // console.log(`i am here to delete \${courseId}`);
    // console.log(e);
    const URLAPI = `${URL}/course/${courseId}`;
    let msg = prompt(`您確定要刪除嗎?\n請輸入想要刪除的課程名稱:`);
    if (msg == `${courseName}`) {
        const response = await axios.delete(URLAPI);
        console.log(response);
        console.log(response.status);
        if (response.status == 200) {
            alert('刪除成功');
        } else {
            alert('刪除失敗');

        }
        loadCourses();

    } else if (msg == null) {
    } else {
        alert('輸入錯誤');
    }
}


onMounted(() => {
    loadCourses();
})

loadAllCourseCategories();
</script>
    
<style scoped></style>