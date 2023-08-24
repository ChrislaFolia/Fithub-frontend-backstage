<template>
    <div class="modal fade" id="insertModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="insertModalLabel">新增課程資料</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <form id="insertCourseForm" method="post" enctype="multipart/form-data" action="#">
                        <div class="mb-3">
                            <label for="categoryId" class="col-form-label">課程分類 :</label>
                            <select class="form-select" name="categoryId" id="categoryId">
                                <option selected value="" style="display:none">請選擇</option>
                                <option v-for="{ categoryId, categoryName } in courseCategories" :value=categoryId>
                                    {{ categoryName }}</option>
                            </select>
                        </div>


                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">課程名稱 :</label>
                            <input type="text" class="form-control" name="courseName" />

                        </div>

                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">課程圖片 :</label>
                            <input class="form-control" type="file" name="courseImgFile" id="courseImgFile">
                        </div>

                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">課程描述 :</label>
                            <textarea class="form-control" rows="6" name="courseDescription"></textarea>

                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" id="sendInsertCourse" @click="sendInsertCourse()"
                        class="btn btn-primary">送出</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup >
import { ref } from "vue";

// solution 1
// const props = defineProps(['courseCategories'])

// solution 2
const props = defineProps({
    courseCategories: Object,
})
const courses = ref([]);
// const sendInsertCourse(e){
//     this.$emit('sendInsertCourse-emit', this.courses)
// }

</script>

<style scoped></style>