<template>
    <div class="modal fade" :id="`updateModal${courseId}`" tabindex=" -1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="updateModalLabel">修改課程資料</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-left">

                    <form :id="`updateCourseForm${courseId}`" method="post" enctype="multipart/form-data" action="#">
                        <div class="mb-3">
                            <label for="categoryId" class="col-form-label">課程分類 :</label>
                            <select class="form-select" name="categoryId" :id="`categoryIdUpdate${courseId}`">
                                <option selected :value="`${courseCategories.categoryId}`" style="display:none">
                                    {{ courseCategories.categoryName }}</option>
                                <option v-for="{ categoryId, categoryName } in allCourseCategories" :value=categoryId>
                                    {{ categoryName }}</option>
                            </select>
                        </div>


                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">課程名稱 :</label>
                            <input type="text" class="form-control" :v-model="courseName" :value="`${courseName}`" />
                        </div>

                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">課程圖片 :</label>
                            <picture>
                                <img :src="`${URL}/course/getImg?cid=${courseId}`" class="img-fluid" alt="not Found">
                                <div class="text-muted text-center">{{ courseName }}原圖片</div>
                            </picture>
                            <input class="form-control" type="file" nzame="courseImgFile" id="courseImgFile">
                        </div>

                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">課程描述 :</label>
                            <textarea class="form-control" rows="6"
                                name="courseDescription">{{ courseDescription }}</textarea>


                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" id="updateCourseSend" class="btn btn-primary">送出</button>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
const URL = import.meta.env.VITE_API_JAVAURL;
const props = defineProps({
    courseId: Number,
    courseCategories: Object,
    courseName: String,
    courseImgPath: String,
    courseDescription: String,
    allCourseCategories: Object,
})


</script>
    
<style scoped></style>