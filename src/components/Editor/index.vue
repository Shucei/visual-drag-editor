<template>
    <div
        id="editor"
        ref="editorRef"
        class="editor"
        :style="editorStyle"
        @contextmenu="handleContextMenu"
    >
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
            <!-- <editor-block :key="item.id" :block="item">
            </editor-block> -->
            <!-- 由于组件存在不同的props需要进行if判断操作不同的props，自定义组件可以做统一的处理 -->
            <component
                :is="item.render()"
                v-if="item.component.startsWith('Input')"
                v-model="item.propValue.modelValue.default"
                :type="item.propValue.type.default"
                :placeholder="item.propValue.placeholder.default"
                :maxlength="item.propValue.maxlength.default"
                :show-password="item.propValue.ShowPassword.default"
            ></component>
            <component
                :is="item.render()"
                v-if="item.component.startsWith('Text')"
                :type="item.propValue.type.default"
                :size="item.propValue.size.default"
                :truncated="item.propValue.truncated.default"
                v-text="item.label"
            ></component>
            <component
                :is="item.render()"
                v-if="item.component.startsWith('Button')"
                :type="item.propValue.type.default"
                :size="item.propValue.size.default"
                :disabled="item.propValue.disabled.default"
                :plain="item.propValue.plain.default"
                :round="item.propValue.round.default"
                :circle="item.propValue.circle.default"
                :color="item.propValue.color.default"
                :loading="item.propValue.loading.default"
                v-text="item.label"
            ></component>
        </shape>

        <!-- 标线MarkLine -->
        <MarkLine></MarkLine>
        <!-- 右击菜单 -->
        <ContextMenu />
    </div>
</template>

<script setup>
import {  computed } from 'vue'
import { storeToRefs } from 'pinia'
import Shape from './Shape.vue'
import ContextMenu from './ContextMenu.vue'
import MarkLine from './MarkLine.vue'
import useStore from '@/store/index.js'
import { getShapeStyle } from '@/utils/style.js'
const { editor,contextmenu } = useStore()
const { canvasStyleData,componentData,curComponent,editorRef } = storeToRefs(editor)


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

const handleContextMenu = (e) => {
    e.stopPropagation()
    e.preventDefault()
    // 计算菜单相对于编辑器的位移
    let target = e.target // 获取事件源
    let top = e.offsetY // 鼠标相对于元素的位移当前点击的盒子距离当前盒子顶部的距离
    let left = e.offsetX // 鼠标相对于元素的位移

    while (target instanceof SVGElement) {
        target = target.parentNode
    } // 如果是svg元素，获取其父元素

    while (!target.className.includes('editor')) { // 如果不是编辑器元素
        // 这一步是因为点击选择的组件时，需要得到选中组件对于编辑器的位移
        left += target.offsetLeft // 获取其相对于编辑器的位移，当前点击的盒子左边距离当前盒子父元素左边
        top += target.offsetTop // 当前元素顶部距离最近父元素顶部的距离
        target = target.parentNode // 获取其父元素
    } // 如果不是编辑器元素，获取其相对于编辑器的位移
    contextmenu.showContextMenu({ top, left })
}
</script>

<style lang="scss" scoped>

.editor {
    position: relative;
    background: #fff;
    margin: auto;

    .lock {
        opacity: .5;

        &:hover {
            cursor: not-allowed; // 不可用
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
