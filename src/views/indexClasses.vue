<template>
  <body class="sb-nav-fixed">
    <NavbarTop></NavbarTop>
    <NavbarLeft></NavbarLeft>
    <div id="layoutSidenav">
      <div id="layoutSidenav_content">
        <main>
          <div class="container-fluid px-4">
            <h1 class="mt-4 mb-2" style="text-align: center">全部課程</h1>

            <div class="card mb-4">
              <div class="card-body table-responsive">
                <div class="mb-3">
                  <router-link
                    to="course"
                    type="button"
                    class="btn btn btn-primary mb-1"
                    >新增課堂資料</router-link
                  >
                </div>
                <table class="table table-bordered">
                  <thead class="align-middle text-center">
                    <tr class="table-primary">
                      <th>課程分類</th>
                      <th>課程名稱</th>
                      <th>負責教練</th>
                      <th>課程時間</th>
                      <th>課程教室</th>
                      <th>課程價格<br />(新台幣)</th>
                      <th>目前報名人數</th>
                      <th>課程人數上限</th>
                      <th>開課人數下限</th>
                      <th>修改</th>
                      <th>刪除</th>
                    </tr>
                  </thead>
                  <tbody class="align-middle text-center">
                    <tr
                      v-for="{
                        classId,
                        courseId,
                        classDate,
                        classTime,
                        employeeId,
                        employeename,
                        courseName,
                        categoryName,
                        price,
                        applicantsCeil,
                        applicantsFloor,
                        classroomId,
                        classroomName,
                        classroomCapacity,
                        coachSubstitute,
                      } in classes"
                      :key="classId"
                    >
                      <td>{{ categoryName }}</td>
                      <td>{{ courseName }}</td>
                      <td>{{ employeename }}</td>
                      <td>{{ classDate }}&nbsp;{{ classTime }}</td>
                      <td>{{ classroomName }}</td>
                      <td>{{ price }}</td>
                      <td>{{ -1 }}</td>
                      <td>{{ applicantsCeil }}</td>
                      <td>{{ applicantsFloor }}</td>
                      <td>
                        <i
                          type="button"
                          class="bi bi-pencil-square"
                          :id="`getUpdateClassesBtn${classId}}`"
                          data-bs-toggle="modal"
                          :data-bs-target="`#updateClassesModal${classId}`"
                        ></i>
                        <UpdateClass
                          :classId="classId"
                          :classDate="classDate"
                          :classTime="classTime"
                          :employeeId="employeeId"
                          :courseId="courseId"
                          :courseName="courseName"
                          :price="price"
                          :applicantsCeil="applicantsCeil"
                          :applicantsFloor="applicantsFloor"
                          :classroomId="classroomId"
                          :classroomName="classroomName"
                          :classroomCapacity="classroomCapacity"
                          :coachSubstitute="coachSubstitute"
                          @submitUpdateClasses-emit="loadClasses"
                        ></UpdateClass>
                      </td>
                      <td>
                        <i
                          type="button"
                          class="bi bi-trash3"
                          @click="deleteClass(`${classId}`, `${courseName}`)"
                        ></i>
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
  </body>
</template>

<script setup>
/*
  imports
*/
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import UpdateClass from "../components/classes/classesUpdateModal.vue";
import NavbarTop from "../components/NavbarTop.vue";
import NavbarLeft from "../components/NavbarLeft.vue";
import Swal from 'sweetalert2'

// Load Classes data
const URL = import.meta.env.VITE_API_JAVAURL;
const classes = ref([]);
const loadClasses = async () => {
  const URLAPI = `${URL}/classes/findAllInMonthRange`;
  const response = await axios
    .get(URLAPI, {
      params: {
        monthBefore: 1,
        monthAfter: 1,
      },
    })
    .catch((error) => {
      console.log(error.toJSON());
    });
  // console.log(response.data);

  classes.value = response.data;
  console.log(classes);
};

/*
  Delete Datas
*/

// deleteCourse
const deleteClass = async (classId, courseName) => {
  // console.log(`i am here to delete \${classID}`);
  // console.log(e);
  const URLAPI = `${URL}/classes/${classId}`;
  let msg = prompt(`您確定要刪除嗎?\n請輸入想要刪除的課程名稱:`);
  if (msg == `${courseName}`) {
    const response = await axios.delete(URLAPI).catch((error) => {
      console.log(error.toJSON());
    });
    if (response.status == 200) {
      // alert("刪除成功");
        Swal.fire({
            title: '刪除成功',
            icon: 'success',
            confirmButtonText: '確定'
        })
    } else {
      // alert("刪除失敗");
        Swal.fire({
            title: '刪除失敗',
            icon: 'warning',
            confirmButtonText: '確定'
        })
    }
    loadClasses();
  } else if (msg == null) {
  } else {
    // alert("輸入錯誤");
        Swal.fire({
            title: '輸入錯誤',
            icon: 'warning',
            confirmButtonText: '確定'
        })
  }
};

/*
  LifeCycle Hooks
 */

onMounted(() => {
  loadClasses();
});
</script>

<style scoped></style>
