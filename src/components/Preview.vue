<template>
    <div ref="container" class="bg">
        <el-button v-if="!isScreenshot" class="close" @click="close">关闭</el-button>
        <el-button v-else class="close" @click="htmlToImage">确定</el-button>
        <div class="canvas-container">
            <div
                class="canvas"
                :style="editorStyle"
            >
                <ComponentWrapper
                    v-for="(item, index) in copyData"
                    :key="index"
                    :config="item"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { deepCopy } from '@/utils/utils'
import ComponentWrapper from '@/components/ComponentWrapper.vue'
import useStore from '@/store/index.js'
const { editor } = useStore()
const { canvasStyleData } = storeToRefs(editor)

const props = defineProps({
    isScreenshot: {
        type: Boolean,
        default: false,
    },
})
const emits = defineEmits(['close'])

const copyData = deepCopy(editor.componentData)

const editorStyle = computed(() => {
    return {
        width: canvasStyleData.value.width + 'px',
        height: canvasStyleData.value.height + 'px',
        backgroundColor: canvasStyleData.value.backgroundColor,
        color: canvasStyleData.value.color,
        fontSize: canvasStyleData.value.fontSize + 'px',
        opcity: canvasStyleData.value.opcity,
    }
})

const close = () => {
    emits('close')
}

const htmlToImage = () => {
    const container = ref(null)
    const canvas = container.value.querySelector('.canvas')
    const width = canvas.offsetWidth // 获取dom 宽度
    const height = canvas.offsetHeight // 获取dom 高度
    const scale = 2 // 解决图片模糊问题
    const canvas2 = document.createElement('canvas')
    canvas2.width = width * scale // 将画布大小放大两倍
    canvas2.height = height * scale // 将画布大小放大两倍
    canvas2.style.width = width + 'px'
    canvas2.style.height = height + 'px'
    const context = canvas2.getContext('2d')
    context.scale(scale, scale)
    html2canvas(canvas, {
        canvas: canvas2,
        scale: scale,
        useCORS: true,
        allowTaint: false,
        backgroundColor: null,
    }).then((canvas) => {
        const img = Canvas2Image.convertToPNG(canvas, canvas.width, canvas.height)
        const a = document.createElement('a')
        a.setAttribute('download', 'canvas.png')
        a.setAttribute('href', img.src)
        a.click()
    })
}

</script>

<style lang="scss" scoped>
.bg {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: fixed;
    background: rgb(0, 0, 0, .5);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    padding: 20px;

    .canvas-container {
        width: calc(100% - 40px);
        height: calc(100% - 120px);
        overflow: auto;

        .canvas {
            background: #fff;
            position: relative;
            margin: auto;
        }
    }

    .close {
        position: absolute;
        right: 20px;
        top: 20px;
    }
}
</style>
