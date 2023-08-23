<template>
    <div id="layoutSidenav">
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">課程管理</h1>

                    <div class="mb-3">
                        <button type="button" id="insertCourse" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#insertModal">新增課程資料</button>
                    </div>

                    <div class="modal fade" id="insertModal" tabindex="-1">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="insertModalLabel">新增課程資料</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">

                                    <form id="insertCourseForm" method="post" enctype="multipart/form-data"
                                        action="${pageContext.request.contextPath}/course.controller">
                                        <div class="mb-3">
                                            <label for="categoryId" class="col-form-label">課程分類 :</label>
                                            <select class="form-select" name="categoryId" id="categoryId">
                                                <option selected value="" style="display:none">請選擇</option>
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
                                    <button type="button" id="insertCourseSend" class="btn btn-primary">送出</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table me-1"></i>
                            全部課程
                        </div>
                        <div class="card-body">
                            <table id="datatablesSimple" class="table table-bordered">
                                <thead>
                                    <tr class="table-dark">
                                        <th>課程名稱</th>
                                        <th>課程分類</th>
                                        <th>課程圖片</th>
                                        <th>課程描述</th>
                                        <th>修改</th>
                                        <th>刪除</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    </div>
</template>
    
<script setup>

</script>
    
<style scoped></style>