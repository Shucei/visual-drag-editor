<template>
    <div
        id="editor"
        ref="editorRef"
        class="editor"
        :style="editorStyle"
        @mousedown="handleMouseDown"
    >
        <!-- <editor-block v-for="block in componentData" :key="block.id" :block="block">
        </editor-block> -->
        <Shape
            v-for="(item, index) in componentData"
            :key="item.id"
            :default-style="item.style"
            :style="getShapeStyle(item.style)"
            :active="item.id === (curComponent || {}).id"
            :element="item"
            :index="index"
            :class="{ lock: item.isLock }"
        >
            <editor-block :key="item.id" :block="item">
            </editor-block>
        </shape>
    </div>
</template>

<script setup>
import {  computed } from 'vue'
import { storeToRefs } from 'pinia'
import Shape from './Shape.vue'
import useStore from '@/store/index.js'
import { getShapeStyle } from '@/utils/style.js'
const { editor,compose } = useStore()
const { canvasStyleData,componentData,curComponent } = storeToRefs(editor)
const { editorRef } = storeToRefs(compose)

const editorStyle = computed(() => {
    return {
        width: canvasStyleData.value.width + 'px',
        height: canvasStyleData.value.height + 'px',
        background: canvasStyleData.value.background,
        color: canvasStyleData.value.color,
        fontSize: canvasStyleData.value.fontSize + 'px',
        opcity: canvasStyleData.value.opcity,
    }
})


</script>

<style lang="scss" scoped>

.editor {
    position: relative;
    background: #fff;
    margin: auto;

    .lock {
        opacity: .5;

        &:hover {
            cursor: not-allowed;
        }
    }
}

.edit {
    .component {
        outline: none;
        width: 100%;
        height: 100%;
    }
}
</style>
