<template>
    <div class="modal fade" :id="`updateModal${courseId}`" tabindex=" -1">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="updateModalLabel">修改課程資料</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-left">

                    <form :id="`updateCourseForm${courseId}`" method="post" enctype="multipart/form-data" action="#">
                        <div class="mb-3">
                            <label for="categoryId" class="col-form-label">課程分類 :</label>
                            <select class="form-select" v-model="course.categoryId" :id="`categoryIdUpdate${courseId}`">
                                <option selected :value="`${courseCategories.categoryId}`" style="display:none">
                                    {{ courseCategories.categoryName }}</option>
                                <option v-for="{ categoryId, categoryName } in allCourseCategories" :value=categoryId>
                                    {{ categoryName }}</option>
                            </select>
                        </div>


                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">課程名稱 :</label>
                            <input type="text" class="form-control" v-model.trim="course.courseName" />
                        </div>

                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">課程圖片 :</label>
                            <picture>
                                <img :src="`${URL}/course/getImg?cid=${courseId}`" class="img-fluid" alt="not Found">
                                <div class="text-muted text-center">{{ courseName }}原圖片</div>
                            </picture>
                            <input class="form-control" type="file" @change="fileChange">
                        </div>

                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">課程描述 :</label>
                            <textarea class="form-control" rows="6" v-model.trim="course.courseDescription"></textarea>


                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" id="updateCourseSend" class="btn btn-primary"
                        @click="submitUpdateCourse">送出</button>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
const URL = import.meta.env.VITE_API_JAVAURL;
import { reactive } from "vue";
import axios from "axios";
const props = defineProps({
    courseId: Number,
    courseCategories: Object,
    courseName: String,
    courseImgPath: String,
    courseDescription: String,
    allCourseCategories: Object,
})

const course = reactive({
    courseId: props.courseId,
    courseName: props.courseName,
    courseImgPath: props.courseImgPath,
    categoryId: props.courseCategories.categoryId,
    courseDescription: props.courseDescription,
});

const formData = new FormData;
formData.append('cId', props.courseId)
formData.append('courseImgPath', props.courseImgPath)
formData.append('_method', 'put');
const fileChange = (e) => {
    let file = e.target.files[0]
    console.log(file)
    formData.append('photoContent', file);
    console.log(formData.get('photoContent'));
}

const submitUpdateCourse = async (e) => {

    if (formData.get('photoContent') != null) {
        console.log(formData.photoContent);
        const resUploadFile = await axios.put(`${URL}/course/uploadImg`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
        ).catch((error) => {
            console.log(error.toJSON());
        });
        console.log(resUploadFile);
        course.courseImgPath = resUploadFile.data
    }
    console.log(course.courseImgPath);
    console.log('I am' + props.courseId);

    const resUpdateCourse = await axios.put(`${URL}/course`, course
    ).catch((error) => {
        console.log(error.toJSON());
    });

    // emit('submitInsertCourse-emit')

    location.reload();
};

</script>
    
<style scoped></style>