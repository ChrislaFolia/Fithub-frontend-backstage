<template>
    <div class="modal fade" :id="`updateClassesModal${classId}`" tabindex="-1">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="updateModalLabel">修改{{ course.courseName }}課程</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <div class="mb-3">
                        <label for="classDate" class="col-form-label">課程時間 :</label>
                        <input type="date" class="form-control" v-model="classes.classDate" id="classDate" />
                    </div>

                    <div class="mb-3">
                        <label for="classTime" class="col-form-label">課程時段 :</label>
                        <select class="form-select" v-model="classes.classTime" id="classTime">
                            <option value='morning'>早上</option>
                            <option value='afternoon'>下午</option>
                            <option value='night'>晚上</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="coach" class="col-form-label">教練 :</label>
                        <select class="form-select" v-model="classes.employeeId" id="coach">
                            <option v-for="{ employeeid, employeename } in allCoachs" :value=employeeid>
                                {{ employeename }}</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="coachSubstitute" class="col-form-label">是否為代課教練 :</label>
                        <select class="form-select" v-model.trim="classes.coachSubstitute" id="coachSubstitute">
                            <option value='0'>否</option>
                            <option value='1'>是</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="classroomSelect" class="col-form-label">教室 :</label>
                        <select class="form-select" v-model="classes.classroomId" id="classroomSelect"
                            @change="setclassroomCapacity">
                            <option v-for="{ classroomId, classroomName } in allClassrooms" :value=classroomId>
                                {{ classroomName }}</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="applicantsCeil" class="col-form-label">課程人數上限 : ({{ classes.classroomName
                        }}使用人數上限為{{ classroom.classroomCapacity }}人)</label>
                        <input type="text" class="form-control" v-model.trim="classes.applicantsCeil" id="applicantsCeil" />
                    </div>

                    <div class="mb-3">
                        <label for="applicantsFloor" class="col-form-label">開課人數下限 :</label>
                        <input type="text" class="form-control" v-model.trim="classes.applicantsFloor"
                            id="applicantsFloor" />
                    </div>

                    <div class="mb-3">
                        <label for="price" class="col-form-label">課程價格 :</label>
                        <input type="text" class="form-control" v-model.trim="classes.price" id="price" />
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" id="sendInsertClass" class="btn btn-primary"
                        @click="submitUpdateClass">送出</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup >
import { ref, reactive, onMounted } from "vue";
import axios from "axios";

const props = defineProps({
    classId: Number,
    classDate: String,
    classTime: String,
    epmloyee: Object,
    coachSubstitute: Number,
    course: Object,
    price: Number,
    applicantsCeil: Number,
    applicantsFloor: Number,
    classroom: Object,

})
const emit = defineEmits(['submitUpdateClasses-emit'])
const classes = reactive({
    classId: props.classId,
    courseId: props.course.courseId,
    classDate: props.classDate,
    classTime: props.classTime,
    employeeId: props.epmloyee.employeeid,
    coachSubstitute: props.coachSubstitute,
    applicantsCeil: props.applicantsCeil,
    applicantsFloor: props.applicantsFloor,
    price: props.price,
    classroomId: props.classroom.classroomId,
});

const classroom = reactive({
    classroomId: props.classroom.classroomId,
    classroomName: props.classroom.classroomName,
    classroomCapacity: props.classroom.classroomCapacity,
})


const URL = import.meta.env.VITE_API_JAVAURL;
const submitUpdateClass = async (e) => {
    console.log(classes.classDate);
    const resUpdateCourse = await axios.put(`${URL}/classes`, classes
    ).catch((error) => {
        console.log(error.toJSON());
    });

    // emit('submitUpdateClasses-emit')
    location.reload();
};

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
    const URLAPI = `${URL}/employees/title`;
    const response = await axios.post(URLAPI, {
        'employeetitle': '教練'
    });
    // console.log(response.data)

    //取得所有分類放進allClassroom變數
    allCoachs.value = response.data;
    // console.log(allCoachs)
};

const setclassroomCapacity = (e) => {
    classroom.classroomId = e.target.value
    for (let room of allClassrooms._rawValue) {
        if (room.classroomId == classroom.classroomId) {
            classroom.classroomName = room.classroomName;
            classroom.classroomCapacity = room.classroomCapacity;
            break;
        }
    }
}

onMounted(() => {
    loadAllClassrooms()
    loadAllCoachs()
})
</script>

<style scoped></style>