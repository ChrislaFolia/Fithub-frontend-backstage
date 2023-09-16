<template>
  <div class="modal fade" id="insertModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="insertModalLabel">新增課程資料</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="categoryId" class="col-form-label"
              ><span class="need-input">*</span>課程分類 :</label
            >
            <select
              class="form-select"
              v-model="course.categoryId"
              id="categoryId"
            >
              <option selected value="" style="display: none">請選擇</option>
              <option
                v-for="{ categoryId, categoryName } in allCourseCategories"
                :value="categoryId"
              >
                {{ categoryName }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="message-text" class="col-form-label"
              ><span class="need-input">*</span>課程名稱 :</label
            >
            <input
              type="text"
              class="form-control"
              v-model.trim="course.courseName"
            />
          </div>

          <div class="mb-3">
            <label for="message-text" class="col-form-label">課程圖片 :</label>
            <input class="form-control" type="file" @change="fileChange" />
          </div>

          <div class="mb-3">
            <label for="message-text" class="col-form-label">課程描述 :</label>
            <textarea
              class="form-control"
              rows="6"
              v-model.trim="course.courseDescription"
            ></textarea>
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
            id="sendInsertCourse"
            class="btn btn-primary"
            @click="submitInsertCourse"
          >
            送出
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import axios from "axios";

// solution 1
// const props = defineProps(['courseCategories'])

// solution 2
const props = defineProps({
  allCourseCategories: Object,
});
const course = reactive({
  courseName: "",
  categoryId: "",
  courseDescription: "",
  courseImgPath: "",
});
const formData = new FormData();
// const courseImgFile = reactive([])

const fileChange = (e) => {
  let file = e.target.files[0];
  console.log(file);
  formData.append("photoContent", file);
  console.log(formData);
};

const emit = defineEmits(["submitInsertCourse-emit"]);
const URL = import.meta.env.VITE_API_JAVAURL;
const submitInsertCourse = async (e) => {
  if (formData.get("photoContent") != null) {
    const resUploadFile = await axios
      .post(`${URL}/course/uploadImg`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
    console.log(resUploadFile);
    course.courseImgPath = resUploadFile.data;
    console.log(course.courseImgPath);
  }
  const resInsertCourse = await axios
    .post(`${URL}/course`, course)
    .catch((error) => {
      console.log(error.toJSON());
    });

  //關閉Modal
  const insertModal = document.getElementById(`insertModal`);
  let getInstanceInsertModal = bootstrap.Modal.getInstance(insertModal);
  getInstanceInsertModal.toggle();

  // 傳送event至parent componont
  emit("submitInsertCourse-emit");
};
</script>

<style scoped>
.need-input {
  color: red;
}
</style>
