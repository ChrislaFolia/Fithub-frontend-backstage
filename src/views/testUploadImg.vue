<template>
  <div id="layoutSidenav">
    <div id="layoutSidenav_content">
      <div class="container-fluid px-4">
        <h1 class="mt-4" style="text-align: center">部門資料</h1>
        <div class="card mb-4">
          <div class="card-body table-responsive">
            <button
              type="submit"
              class="btn btn-outline-info"
              data-bs-toggle="modal"
              data-bs-target="#insertModal"
            >
              新增部門
            </button>
            <table id="departmentsTable" class="table table-bordered">
              <thead class="align-middle text-center">
                <div>
                  <input id="inputImg" type="file" />
                  <button @click="uploadImage()">上传图片</button>
                </div>
              </thead>
              <tbody class="align-middle text-center"></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref , onMounted } from "vue";
import axios from "axios";

const selectedFile = ref(null);
const url = import.meta.env.VITE_API_JAVAURL;


onMounted(() => {
  var inputImg = document.getElementById('inputImg')

  inputImg.addEventListener('change',function(e){
    selectedFile.value = e.target.files[0];
    console.log("test1")
  })
});

const uploadImage = async () => {
  console.log("test2")
  if (!selectedFile.value) {
    console.log("test3")
    return;
  }

  const reader = new FileReader();
  console.log("test4")
  reader.onload = async (event) => {
    console.log("test5")
    const base64Image = event.target.result;
    const jsonPayload = { employeeid: 1,cpicfile: base64Image };

    try {
      const response = await axios.post(`${url}/coachpics`, jsonPayload);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  reader.readAsDataURL(selectedFile.value);
};
</script>
