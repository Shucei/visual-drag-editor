<template>
    <div id="editor" class="editor " :style="editorStyle">
        <editor-block v-for="block in componentData" :key="block.component" :block="block">
        </editor-block>
    </div>
</template>

<script setup>
import {  computed } from 'vue'
import { storeToRefs } from 'pinia'
import useStore from '@/store/index.js'
const { editor } = useStore()
const { canvasStyleData,componentData } = storeToRefs(editor)
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
    margin: auto;
}
</style>