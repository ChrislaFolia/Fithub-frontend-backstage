<template>
    <div>
        <div id="editor"></div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, watch } from 'vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// 接收 v-model
const props = defineProps({
    modelValue: String  // 此处根据需要设置类型
});

// 创建编辑器实例
const editor = ref(null);

// 初始化 CKEditor
onMounted(() => {
    ClassicEditor
        .create(document.querySelector('#editor'))
        .then(newEditor => {
            editor.value = newEditor;
            editor.value.setData(props.modelValue);  // 初始化编辑器内容

            // 监听编辑器内容变化，更新父组件绑定的值
            editor.value.model.document.on('change:data', () => {
                emit('update:modelValue', editor.value.getData());
            });
        })
        .catch(error => {
            console.error(error);
        });
});

// 监听外部 modelValue 变化，更新编辑器内容
watch(() => props.modelValue, (newValue) => {
    if (editor.value) {
        editor.value.setData(newValue);
    }
});
</script>
  