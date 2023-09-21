<template>
    <div
        ref="componentRef"
        class="shape"
        :class="{ active }"
        @mousedown="handleMouseDownOnShape"
    >
        <span v-show="isActive()" class="iconfont icon-rotate" @mousedown="handleRotate"></span>
        <span v-show="element.isLock" class="iconfont icon-suo"></span>
        <!-- <div
            v-for="item in pointList"
            :key="item"
            class="shape-point"
            :style="getPointStyle(item)"
        >
        </div> -->
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
    if (props.element.isLock) return // 如果锁定则不可移动
    editor.setCurComponent({ component: props.element, index: props.index })
    const pos = { ...props.defaultStyle }
    const startY = e.clientY
    const startX = e.clientX
    // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
    const startTop = Number(pos.top)
    const startLeft = Number(pos.left)
    const move = (moveEvent) => {
        const curX = moveEvent.clientX
        const curY = moveEvent.clientY
        pos.top = curY - startY + startTop
        pos.left = curX - startX + startLeft

        // 修改当前组件样式
        editor.setShapeStyle({ ...pos })
        // 等更新完当前组件的样式并绘制到屏幕后再判断是否需要吸附
        // 如果不使用 $nextTick，吸附后将无法移动
        // this.$nextTick(() => {
        //     // 触发元素移动事件，用于显示标线、吸附功能
        //     // 后面两个参数代表鼠标移动方向
        //     // curY - startY > 0 true 表示向下移动 false 表示向上移动
        //     // curX - startX > 0 true 表示向右移动 false 表示向左移动
        //     eventBus.$emit('move', curY - startY > 0, curX - startX > 0)
        // })
    }

    const up = () => {
        // hasMove && this.$store.commit('recordSnapshot')
        // // 触发元素停止移动事件，用于隐藏标线
        // eventBus.$emit('unmove')
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
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // 旋转前的角度
    const rotateDegreeBefore = Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180)

    // 如果元素没有移动，则不保存快照
    // let hasMove = false
    const move = (moveEvent) => {
        // hasMove = true
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
        // hasMove && this.$store.commit('recordSnapshot')
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
    cursor: grab;
    color: #59c7f9;
    font-size: 20px;
    font-weight: 600;

    &:active {
        cursor: grabbing;
    }
}

.icon-suo {
    position: absolute;
    top: 0;
    right: 0;
}
</style>