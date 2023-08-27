<template>
    <div class="modal fade" id="insertModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="insertModalLabel">新增課程資料</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <!-- <form id="insertCourseForm" method="post" enctype="multipart/form-data" action="#"> -->
                    <div class="mb-3">
                        <label for="categoryId" class="col-form-label">課程分類 :</label>
                        <select class="form-select" v-model="course.categoryId" id="categoryId">
                            <option selected value="" style="display:none">請選擇</option>
                            <option v-for="{ categoryId, categoryName } in allCourseCategories" :value=categoryId>
                                {{ categoryName }}</option>
                        </select>
                    </div>


                    <div class="mb-3">
                        <label for="message-text" class="col-form-label">課程名稱 :</label>
                        <input type="text" class="form-control" v-model="course.courseName" />

                    </div>

                    <div class="mb-3">
                        <label for="message-text" class="col-form-label">課程圖片 :</label>
                        <input class="form-control" type="file" @change="fileChange" id="courseImgFile">
                    </div>

                    <div class="mb-3">
                        <label for="message-text" class="col-form-label">課程描述 :</label>
                        <textarea class="form-control" rows="6" v-model="course.courseDescription"></textarea>

                    </div>
                    <!-- </form> -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" id="sendInsertCourse" @click="submitInsertCourse"
                        class="btn btn-primary">送出</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup >
import { reactive } from "vue";
import axios from "axios";

// solution 1
// const props = defineProps(['courseCategories'])

// solution 2
const props = defineProps({
    allCourseCategories: Object,
})
const emit = defineEmits(['submitInsertCourse-emit'])
const course = reactive({
    courseName: '',
    categoryId: '',
    courseDescription: '',
    // courseImgFile: [],
});

const courseImgFile = reactive([])

const fileChange = (e) => {
    let file = e.target.files[0]
    // console.log(file)
    courseImgFile = []
    courseImgFile.push(file)
    // console.log(course.courseImgFile);
}
// const sendInsertCourse(e){
//     this.$emit('sendInsertCourse-emit', this.courses)
// }
const URL = import.meta.env.VITE_API_JAVAURL;
const submitInsertCourse = async (e) => {
    const URLAPI = `${URL}/course`;

    const response = await axios.post(URLAPI, course
    ).catch((error) => {
        console.log(error.toJSON());
    });

    emit('submitInsertCourse-emit')
};

</script>

<style scoped></style>