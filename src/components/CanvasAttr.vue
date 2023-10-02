<template>
    <div class="attr-container">
        <p class="title">画布属性</p>
        <el-form style="padding: 20px;">
            <el-form-item v-for="(key, index) in Object.keys(options)" :key="index" :label="options[key]">
                <el-color-picker
                    v-if="isIncludesColor(key)"
                    v-model="canvasStyleData[key]"
                    show-alpha
                    :predefine="predefineColors"
                ></el-color-picker>


                <el-input v-else v-model.number="canvasStyleData[key]" type="number" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useStore from '@/store/index.js'
const { editor } = useStore()
const { canvasStyleData } = storeToRefs(editor)

const options = {
    color: '颜色',
    opacity: '透明度',
    fontSize: '字体大小',
    backgroundColor: '背景',
}
const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
])
const isIncludesColor = (str) => {
    return str.toLowerCase().includes('color')
}

</script>

<style lang="scss">
.attr-container {
    .title {
        text-align: center;
        margin-bottom: 10px;
        height: 40px;
        line-height: 40px;
        border-bottom: 2px solid #e4e7ed;
        font-size: 14px;
        font-weight: 500;
        color: #303133;
    }
}
</style>
