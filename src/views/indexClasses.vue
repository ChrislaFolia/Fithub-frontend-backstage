<template>
    <div id="layoutSidenav">
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4 mb-2" style="text-align: center;">全部課程</h1>

                    <div class="card mb-4">
                        <div class="card-body table-responsive">
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
                                            <i type="button" class="bi bi-pencil-square"
                                                :id="`getUpdateCourseBtn${courseId}}`" data-bs-toggle="modal"
                                                :data-bs-target="`#updateModal${classesId}`"></i>
                                        </td>
                                        <td>
                                            <i type="button" class="bi bi-trash3"
                                                @click="deleteClass(`${classId}`, `${course.courseName}`)"></i>
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
// Load Classes data
const URL = import.meta.env.VITE_API_JAVAURL;
const classes = ref([]);
const loadClasses = async () => {
    const URLAPI = `${URL}/classes/findAll`;
    const response = await axios.get(URLAPI);
    // console.log(response.data)

    //classes
    classes.value = response.data;
    // console.log(classes)
};


// deleteCourse
const deleteClass = async (classId, courseName) => {
    // console.log(`i am here to delete \${classID}`);
    // console.log(e);
    const URLAPI = `${URL}/classes/${classId}`;
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
        loadClasses();

    } else if (msg == null) {
    } else {
        alert('輸入錯誤');
    }
}

onMounted(() => {
    loadClasses()
})
</script>
    
<style scoped></style>