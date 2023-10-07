<template>
    <div class="home  h-screen overflow-hidden">
        <Toolbar />
        <main class="flex">
            <!-- 左侧组件列表 -->
            <section class="left">
                <ComponentList></ComponentList>
                <RealTimeComponentList></RealTimeComponentList>
            </section>
            <!-- 中间画布 -->
            <section class="center  overflow-auto bg-slate-100 shadow-md">
                <div
                    class="content"
                    @drop="handleDrop"
                    @dragover="handleDragOver"
                    @mousedown="handleMouseDown"
                    @mouseup="deselectCurComponent"
                >
                    <Editor />
                </div>
            </section>
            <!-- 右侧属性列表 -->
            <section class="right">
                <el-tabs v-if="curComponent" v-model="activeName">
                    <el-tab-pane label="属性" name="attr">
                        <!-- <component :is="curComponent.component + 'Attr'" /> -->
                        <ComponentAttr :prop-value="curComponent.propValue"></ComponentAttr>
                    </el-tab-pane>
                    <el-tab-pane label="动画" name="animation">
                        <AnimationList></AnimationList>
                    </el-tab-pane>
                    <el-tab-pane label="事件" name="events">
                        <EventList></EventList>
                    </el-tab-pane>
                </el-tabs>
                <CanvasAttr v-else></CanvasAttr>
            </section>
        </main>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import Toolbar from '@/components/ToolBar.vue'
import Editor from '@/components/Editor/index.vue'
import ComponentList from '@/components/ComponentList.vue'
import CanvasAttr from '@/components/CanvasAttr.vue'
import  RealTimeComponentList from '@/components/RealTimeComponentList.vue'
import ComponentAttr from '@/components/ComponentAttr.vue'
import  AnimationList from '@/components/AnimationList.vue'
import EventList from '@/components/EventList.vue'
import { registerConfig } from '@/data/components-list.js'
import { deepCopy, generateID } from '@/utils/utils.js'
import useStore from '@/store/index.js'
const { editor,contextmenu,snapshot } = useStore()
const { editorRef,curComponent } = storeToRefs(editor)
const activeName = ref('attr')
// 拖拽释放
const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const index = e.dataTransfer.getData('index') // 获取拖拽数据
    const rectInfo = editorRef.value.getBoundingClientRect() // 获取画布的位置信息
    if (index) {
        const component = deepCopy(registerConfig.componentList[index]) // 深拷贝组件配置
        component.style.top = e.clientY - rectInfo.y // 根据鼠标位置调整组件位置
        component.style.left = e.clientX - rectInfo.x// 根据鼠标位置调整组件位置
        component.id = generateID()
        // changeComponentSizeWithScale(component) // 根据缩放比例调整组件大小
        editor.addComponent({ component })
        snapshot.recordSnapshot()
    }
}

const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
}

// 鼠标按下
const handleMouseDown = (e) => {
    e.stopPropagation()
    editor.setClickComponentStatus(false) // 设置点击组件状态, 鼠标按下画布时取消点击组件状态
    editor.setInEditorStatus(true)
}

// 鼠标抬起
const deselectCurComponent = (e) => {
    if (!editor.isClickComponent) {
        editor.setCurComponent( { component: null, index: null })
    }
    // 0 左击 1 滚轮 2 右击
    if (e.button != 2) {
        contextmenu.hideContextMenu()
    }
}


</script>

<style lang="scss" scoped>
.home {
    main {
        height: 100%;

        .left{
            width: 290px;
        }
        .right {
            width: 400px;
        }

        .center {
            width: 100%;
            height: 100%;
            padding: 20px;
            padding-bottom: 80px;
            overflow: auto;

            .content {
                width: 100%;
                height: 100%;
                overflow: auto;
            }
        }
    }

   ::v-deep .el-tabs__nav-scroll {
        display: flex;
        justify-content: center;
    }
}
</style>
