<template>
    <div id="layoutSidenav">
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4" style="text-align: center;">全部課程</h1>


                    <div class="card mb-4">
                        <!-- <div class="card-header">
                            <i class="fas fa-table me-1"></i>
                            全部課程
                        </div> -->
                        <div class="card-body table-responsive">
                            <div class="mb-3">
                                <button type="button" id="insertCourse" class="btn btn btn-primary mb-1"
                                    data-bs-toggle="modal" data-bs-target="#insertModal">新增課程資料</button>
                            </div>
                            <InsertCourse :courseCategories="allCourseCategories"></InsertCourse>
                            <table class="table table-bordered">
                                <thead class="align-middle text-center">
                                    <tr class="table-primary">
                                        <th>課程名稱</th>
                                        <th>課程分類</th>
                                        <th>課程圖片</th>
                                        <th>課程描述</th>
                                        <th>修改</th>
                                        <th>刪除</th>
                                    </tr>
                                </thead>
                                <tbody class="align-middle text-center">
                                    <tr v-for=" { courseId, courseName, courseCategories, courseImgPath, courseDescription }  in   courses  "
                                        :key="courseId">
                                        <td>{{ courseName }}</td>
                                        <td>{{ courseCategories.categoryName }} </td>
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
                                            <button :id="`deleteCourse${courseId}`" class="btn btn-outline-danger btn-sm">刪除
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
import courseImg from '../components/util/imageModal.vue';
import courseDescription from '../components/util/textModal.vue';
import UpdateCourse from '../components/course/courseUpdateModal.vue'
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
    const response = await axios.get(URLAPI, datas);
    console.log(response.data)

    //取得所有分類放進courseCategories變數
    allCourseCategories.value = response.data;
    console.log(allCourseCategories)

};


onMounted(() => {
    loadCourses();
})

loadAllCourseCategories();
</script>
    
<style scoped></style>