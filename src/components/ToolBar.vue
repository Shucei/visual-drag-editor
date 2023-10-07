<template>
    <div>
        <div class="toolbar text-left bg-white h-16">
            <el-button @click="handleAceEditorChange">JSON</el-button>
            <el-button @click="revocation">撤消</el-button>
            <el-button @click="recover">恢复</el-button>
            <el-button @click="preview(false)">预览</el-button>
            <el-button @click="clearCanvas">清空画布</el-button>
        </div>

        <!-- 预览 -->
        <Preview v-if="isShowPreview" :is-screenshot="isScreenshot" @close="handlePreviewChange" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useStore from '@/store/index.js'
import Preview from '@/components/Preview.vue'
const { editor, snapshot } = useStore()
const { canvasStyleData,editMode } = storeToRefs(editor)

const isShowPreview = ref(false) // 是否显示预览
const isScreenshot = ref(false) // 是否截图

const handleAceEditorChange = () => {
    console.log(canvasStyleData.value.opacity++)
}

const revocation = () => {
    console.log('撤消')
    snapshot.revocation()
}

const recover = () => {
    console.log('恢复')
    snapshot.recover()
}

// 清空画布
const clearCanvas = () => {
    editor.setCurComponent({ component: null, index: null, componentRef: null })
    editor.setComponentData([])
    snapshot.recordSnapshot()
}

// 预览
const preview = (value) => {
    isShowPreview.value = true
    isScreenshot.value = value
}

// 关闭预览
const handlePreviewChange = () => {
    isShowPreview.value = false
    editMode.value = 'edit'
}
</script>


<style lang="scss" scoped>
.toolbar {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid #ebeef5;
    background-color: #cffafe;
    padding: 15px 10px;

    .el-button {
        margin-right: 10px;
    }
}
</style>