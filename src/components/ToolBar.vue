<template>
    <div>
        <div class="toolbar text-left bg-white h-16">
            <el-button @click="handleAceEditorChange">JSON</el-button>
            <el-button>撤消</el-button>
            <el-button>重做</el-button>
        </div>
    </div>
</template>

<script setup>
// import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import useStore from '@/store/index.js'
const { editor } = useStore()

const { canvasStyleData } = storeToRefs(editor)

const handleAceEditorChange = () => {
    console.log(canvasStyleData.value.opacity++)
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