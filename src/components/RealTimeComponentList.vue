<template>
    <div
        ref="componentListRef"
        class="real-time-component-list"
        @dragstart="handlStart"
        @dragenter="handlEnter"
        @dragend="handlEnd"
    >
        <div
            v-for="(item, index) in editor.componentData"
            :key="index"
            draggable="true"
            class="list"
            :class="{ actived: transformIndex(index) === editor.curComponentIndex }"
            :data-index="transformIndex(index)"
            @click="onClick(transformIndex(index))"
        >
            <span class="iconfont" :class="'icon-' + getComponent(index).icon"></span>
            <span>{{ getComponent(index).label }}</span>
            <div class="icon-container">
                <span class="iconfont icon-shanchu" @click="deleteComponent(transformIndex(index))"></span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useStore from '@/store/index.js'
import { swap } from '@/utils/utils'
const { editor, snapshot } = useStore()
const { componentData } = storeToRefs(editor)
const getComponent = (index) => {
    return editor.componentData[editor.componentData.length - 1 - index]
}

const transformIndex = (index) => {
    return editor.componentData.length - 1 - index // 由于组件是从下往上渲染的，所以需要转换下标
}

const onClick = (index) => {
    setCurComponent(index)
}

const deleteComponent = () => {
    setTimeout(() => {
        editor.deleteComponent()
        snapshot.recordSnapshot()
    })
}

const setCurComponent = (index) => {
    editor.setCurComponent({ component: editor.componentData[index], index })
}


let sourceIndex = null
const componentListRef = ref(null)
const handlStart = (e) => {
    setTimeout(() => {
        e.target.classList.add('list-moving')
    })
    sourceIndex = e.target.dataset.index
}

const handlEnter = (e) => {
    e.preventDefault()
    let targetIndex = e.target.dataset.index
    console.log(targetIndex)
    if (e.target === componentListRef.value || targetIndex === sourceIndex || targetIndex === undefined) {
        return
    }

    if (sourceIndex < targetIndex) { // 向上移动
        swap(componentData.value, sourceIndex, targetIndex)
    } else {
        swap(componentData.value, sourceIndex, targetIndex)
    } // 向下移动
    snapshot.recordSnapshot()
}

const handlEnd = (e) => {
    e.target.classList.remove('list-moving')
}
</script>

<style lang="scss" scoped>
.real-time-component-list {
    height: 35%;

    .list {
        height: 30px;
        cursor: grab;
        text-align: center;
        color: #333;
        display: flex;
        align-items: center;
        font-size: 12px;
        padding: 0 10px;
        position: relative;
        user-select: none;

        &:active {
            cursor: grabbing;
        }

        &:hover {
            background-color: rgba(200, 200, 200, .2);

            .icon-container {
                display: block;
            }
        }

        .iconfont {
            margin-right: 4px;
            font-size: 16px;
        }

        .icon-container {
            position: absolute;
            right: 10px;
            display: none;

            .iconfont {
                cursor: pointer;
            }
        }
    }

    .actived {
        background: #ecf5ff;
        color: #409eff;
    }

    .list-moving {
        background: transparent;
        color: transparent;
    }
}
</style>
