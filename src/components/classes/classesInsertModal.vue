<template>
  <div
    class="modal fade"
    :id="`insertClassesModal${courseId}`"
    tabindex="-1"
    aria-labelledby="insertModal"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="insertModalLabel">
            建立{{ courseName }}課程
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="classDate" class="col-form-label"
              ><span class="need-input">*</span>課程時間 :</label
            >
            <input
              type="date"
              class="form-control"
              v-model="classes.classDate"
              id="classDate"
            />
          </div>

          <div class="mb-3">
            <label for="classTime" class="col-form-label"
              ><span class="need-input">*</span>課程時段 :</label
            >
            <select
              class="form-select"
              v-model="classes.classTime"
              id="classTime"
            >
              <option selected value="" style="display: none">請選擇</option>
              <option value="早上">早上</option>
              <option value="下午">下午</option>
              <option value="晚上">晚上</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="coach" class="col-form-label"
              ><span class="need-input">*</span>教練 :</label
            >
            <select class="form-select" v-model="classes.employeeId" id="coach">
              <option selected value="" style="display: none">請選擇</option>
              <option
                v-for="{ employeeid, employeename } in allCoachs"
                :value="employeeid"
              >
                {{ employeename }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="coachSubstitute" class="col-form-label"
              >是否為代課教練 :</label
            >
            <select
              class="form-select"
              v-model="classes.coachSubstitute"
              id="coachSubstitute"
            >
              <option selected value="0">否</option>
              <option value="1">是</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="classroomSelect" class="col-form-label"
              ><span class="need-input">*</span>教室 :</label
            >
            <select
              class="form-select"
              v-model="classes.classroomId"
              id="classroomSelect"
              @change="setclassroomCapacity"
            >
              <option selected value="" style="display: none">請選擇</option>
              <option
                v-for="{ classroomId, classroomName } in allClassrooms"
                :value="classroomId"
              >
                {{ classroomName }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="applicantsCeil" class="col-form-label"
              ><span class="need-input">*</span>課程人數上限 : ({{
                classroom.classroomName
              }}使用人數上限為{{ classroom.classroomCapacity }}人)</label
            >
            <input
              type="text"
              class="form-control"
              v-model.trim="classes.applicantsCeil"
              id="applicantsCeil"
            />
          </div>

          <div class="mb-3">
            <label for="applicantsFloor" class="col-form-label"
              ><span class="need-input">*</span>開課人數下限 :</label
            >
            <input
              type="text"
              class="form-control"
              v-model.trim="classes.applicantsFloor"
              id="applicantsFloor"
            />
          </div>

          <div class="mb-3">
            <label for="price" class="col-form-label"
              ><span class="need-input">*</span>課程價格 :</label
            >
            <input
              type="text"
              class="form-control"
              v-model.trim="classes.price"
              id="price"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="submit"
            id="sendInsertClass"
            class="btn btn-primary"
            @click="submitInsertClass"
          >
            送出
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/*
  imports
 */
import { ref, reactive, onMounted } from "vue";
import router from "../../router";
import axios from "axios";
const URL = import.meta.env.VITE_API_JAVAURL;

/*
  props
 */
const props = defineProps({
  courseId: Number,
  courseName: String,
});

/*
  Declare
*/
const classes = reactive({
  courseId: props.courseId,
  classDate: "",
  classTime: "",
  employeeId: "",
  coachSubstitute: 0,
  applicantsCeil: 0,
  applicantsFloor: 0,
  price: 150,
  classroomId: "",
});

const classroom = reactive({
  classroomId: "",
  classroomName: "",
  classroomCapacity: 30,
});

/*
  Emits
*/
const emit = defineEmits(["submitInsertClasses-emit"]);

/*
  Methods
 */

// Action for insert
const submitInsertClass = async (e) => {
  const resInsertCourse = await axios
    .post(`${URL}/classes`, classes)
    .catch((error) => {
      console.log(error.toJSON());
    });

  //關閉Modal
  const insertModal = document.getElementById(
    `insertClassesModal${props.courseId}`
  );
  let getInstanceInsertModal = bootstrap.Modal.getInstance(insertModal);
  getInstanceInsertModal.toggle();
  router.push("/classes");

  emit("submitInsertClasses-emit");
  // location.reload();
};

// Action for show classroom capacity for reference
const setclassroomCapacity = (e) => {
  classroom.classroomId = e.target.value;
  for (let room of allClassrooms._rawValue) {
    if (room.classroomId == classroom.classroomId) {
      classroom.classroomName = room.classroomName;
      classroom.classroomCapacity = room.classroomCapacity;
      break;
    }
  }
};

/*
  Load datas
*/

// Load classroom data
const allClassrooms = ref([]);
const loadAllClassrooms = async () => {
  const URLAPI = `${URL}/classroom/listWithoutDescriptionsAndPics`;
  const response = await axios.get(URLAPI);
  // console.log(response.data)

  //取得所有分類放進allClassroom變數
  allClassrooms.value = response.data;
  // console.log(allClassrooms)
};
// Load employee data
const allCoachs = ref([]);
const loadAllCoachs = async () => {
  const URLAPI = `${URL}/employees/coachs`;
  const response = await axios.get(URLAPI);
  // console.log(response.data)

  //取得所有分類放進allClassroom變數
  allCoachs.value = response.data;
  // console.log(allCoachs)
};

/*
  Validation
*/
const validatedInputState = reactive({
  classDate: "is-valid", // 是否爲空, 是否小於今天，是否在？個月後
  classTime: "is-valid", // 是否爲空
  employeeId: "is-valid", // 是否爲空
  classroomId: "is-valid", // 是否爲空,是否已使用
  applicantsCeil: "is-valid", // 是否爲空，是否<0，是否> classroom capacity,沒填自動補ceil值
  applicantsFloor: "is-valid", // 是否爲空，是否<0 ,沒填自動補0
  price: "is-valid", // 是否爲空，是否<=0
});

/*
  Life Cycle Hooks
*/

onMounted(() => {
  loadAllClassrooms();
  loadAllCoachs();
});
</script>

<style scoped>
.need-input {
  color: red;
}
</style>
