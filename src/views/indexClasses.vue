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
                                    data-bs-toggle="modal" data-bs-target="#insertModal">新增課堂資料</button>
                            </div>
                            <!-- <InsertCourse :allCourseCategories="allCourseCategories"
                                @submitInsertCourse-emit="loadClasses()"></InsertCourse> -->
                            <table class="table table-bordered">
                                <thead class="align-middle text-center">
                                    <tr class="table-primary">
                                        <th>課程分類</th>
                                        <th>課程名稱</th>
                                        <th>負責教練</th>
                                        <th>課程時間</th>
                                        <th>課程教室</th>
                                        <th>課程價格<br />(新台幣)</th>
                                        <th>目前課程人數</th>
                                        <th>課程人數上限</th>
                                        <th>開課人數下限</th>
                                        <th>修改</th>
                                        <th>刪除</th>
                                    </tr>
                                </thead>
                                <tbody class="align-middle text-center">
                                    <tr v-for=" { classId, classDate, classTime, epmloyee, course, price, applicantsCeil, applicantsFloor, classroom }  in   classes  "
                                        :key="classId">
                                        <td>{{ course.courseCategories.categoryName }}</td>
                                        <td>{{ course.courseName }}</td>
                                        <td>{{ epmloyee.employeename }}</td>
                                        <td>{{ classDate }}&nbsp;{{ classTime }}</td>
                                        <td>{{ classroom.classroomName }}</td>
                                        <td>{{ price }}</td>
                                        <td>{{ -1 }}</td>
                                        <td>{{ applicantsCeil }}</td>
                                        <td>{{ applicantsFloor }}</td>
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
// Load course data
const URL = import.meta.env.VITE_API_JAVAURL;
const classes = ref([]);
const loadClasses = async () => {
    const URLAPI = `${URL}/classes/findAll`;
    const response = await axios.get(URLAPI);
    console.log(response.data)

    //classes
    classes.value = response.data;
    console.log(classes)
};

onMounted(() => {
    loadClasses()
})
</script>
    
<style scoped></style>