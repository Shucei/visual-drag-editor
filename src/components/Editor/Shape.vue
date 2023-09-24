<template>
    <div
        ref="componentRef"
        class="shape"
        :class="{ active }"
        @mousedown="handleMouseDownOnShape"
    >
        <span v-show="isActive()" class="iconfont icon-rotate" @mousedown="handleRotate"></span>
        <span v-show="element.isLock" class="iconfont icon-suo"></span>
        <slot></slot>
    </div>
</template>

<script setup>
import { defineProps,ref } from 'vue'
// import { storeToRefs } from 'pinia'
import useStore from '@/store/index.js'
const { editor, compose } = useStore()
// const { canvasStyleData,componentData,curComponent } = storeToRefs(editor)
// const { editorRef } = storeToRefs(compose)
const props = defineProps({
    defaultStyle: {
        type: Object,
        default: () => ({}),
    },
    // style: {
    //     type: Object,
    //     default: () => ({}),
    // },
    active: {
        type: Boolean,
        default: false,
    },
    element: {
        type: Object,
        default: () => ({}),
    },
    index: {
        type: Number,
        default: 0,
    },
})

const isActive = () => {
    return props.active && !props.element.isLock // 选中且未锁定
}

const handleMouseDownOnShape = (e) => {
    e.stopPropagation()
    e.preventDefault()
    editor.setInEditorStatus(true) // 设置鼠标在编辑器内
    editor.setClickComponentStatus(true) // 设置点击组件状态

    editor.setCurComponent({ component: props.element, index: props.index })
    if (props.element.isLock) return // 如果锁定则不可移动
    const pos = { ...props.defaultStyle }
    const startY = e.clientY
    const startX = e.clientX
    // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
    const startTop = Number(pos.top)
    const startLeft = Number(pos.left)
    const move = (moveEvent) => {
        const curX = moveEvent.clientX // 鼠标当前位置
        const curY = moveEvent.clientY // 鼠标当前位置
        pos.top = curY - startY + startTop // 修改top值
        pos.left = curX - startX + startLeft // 修改left值
        // 修改当前组件样式
        editor.setShapeStyle({ ...pos })
    }
    const up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
}

// 处理旋转
const componentRef = ref(null)
const handleRotate=(e) =>{
    editor.setClickComponentStatus(true) // 设置点击组件状态
    e.preventDefault()
    e.stopPropagation()
    // 初始坐标和初始角度
    const pos = { ...props.defaultStyle }
    const startY = e.clientY
    const startX = e.clientX
    const startRotate = pos.rotate

    // 获取元素中心点位置
    const rect = componentRef.value.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2 // 元素中心点x坐标
    const centerY = rect.top + rect.height / 2 // 元素中心点y坐标

    // 旋转前的角度
    const rotateDegreeBefore = Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180) // 旋转前的角度,atan2返回的是弧度值，需要转为角度值
    const move = (moveEvent) => {
        const curX = moveEvent.clientX
        const curY = moveEvent.clientY
        // 旋转后的角度
        const rotateDegreeAfter = Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180)
        // 获取旋转的角度值
        pos.rotate = startRotate + rotateDegreeAfter - rotateDegreeBefore
        // 修改当前组件样式
        editor.setShapeStyle({ ...pos })
    }

    const up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
}

</script>

<style lang="scss" scoped>
.shape {
    position: absolute;

    &:hover {
        cursor: move;
    }
}

.active {
    outline: 1px solid #70c0ff;
    user-select: none;
    // padding: 6px;
}

.shape-point {
    position: absolute;
    background: #fff;
    border: 1px solid #59c7f9;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    z-index: 1;
}

.icon-rotate {
    position: absolute;
    top: -34px;
    left: 50%;
    transform: translateX(-50%);
    cursor: grab; // 拖拽
    color: #59c7f9;
    font-size: 20px;
    font-weight: 600;

    &:active {
        cursor: grabbing; // 拖拽中
    }
}

.icon-suo {
    position: absolute;
    top: 0;
    right: 0;
}
</style>