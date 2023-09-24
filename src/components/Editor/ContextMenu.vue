<template>
    <div v-show="menuShow" class="contextmenu" :style="{ top: menuTop + 'px', left: menuLeft + 'px' }">
        <ul @mouseup="handleMouseUp">
            <template v-if="curComponent">
                <template v-if="!curComponent.isLock">
                    <li @click="copyComponent">复制</li>
                    <li @click="pasteComponent">粘贴</li>
                    <li @click="cutComponent">剪切</li>
                    <li @click="deleteComponent">删除</li>
                    <li @click="lock">锁定</li>
                    <li @click="topComponent">置顶</li>
                    <li @click="bottomComponent">置底</li>
                    <li @click="upComponent">上移</li>
                    <li @click="downComponent">下移</li>
                </template>
                <li v-else @click="unlock">解锁</li>
            </template>
            <li v-else @click="pasteComponent">粘贴</li>
        </ul>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import useStore from '@/store/index.js'
const { contextmenu,editor,snapshot } = useStore()
const { curComponent } = storeToRefs(editor)
const { menuLeft,menuShow,menuTop } = storeToRefs(contextmenu)

// 点击菜单时不取消当前组件的选中状态，因为点击菜单时会触发mouseup事件，会取消当前组件的选中状态
const handleMouseUp = () => {
    editor.setClickComponentStatus(true) // 设置点击组件状态
}

// 复制组件
const copyComponent = () => {
    contextmenu.copyComponent()
}

// 粘贴组件
const pasteComponent = () => {
    contextmenu.pasteComponent(true)
    snapshot.recordSnapshot()
}

// 剪切组件
const cutComponent = () => {
    contextmenu.cutComponent()
}

// 删除组件
const deleteComponent = () => {
    editor.deleteComponent()
    snapshot.recordSnapshot()
}

// 锁定组件
const lock = () => {
    contextmenu.lockComponent()
}

// 解锁组件
const unlock = () => {
    contextmenu.unlockComponent()
}

// 置顶组件
const topComponent = () => {
    contextmenu.topComponent()
    snapshot.recordSnapshot()
}

// 置底组件
const bottomComponent = () => {
    contextmenu.bottomComponent()
    snapshot.recordSnapshot()
}

// 上移组件
const upComponent = () => {
    contextmenu.upComponent()
    snapshot.recordSnapshot()
}
// 下移组件
const downComponent = () => {
    contextmenu.downComponent()
    snapshot.recordSnapshot()
}
</script>

<style lang="scss" scoped>
.contextmenu {
    position: absolute;
    z-index: 1000;

    ul {
        border: 1px solid #e4e7ed;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        box-sizing: border-box;
        margin: 5px 0;
        padding: 6px 0;

        li {
            font-size: 14px;
            padding: 0 20px;
            position: relative;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #606266;
            height: 34px;
            line-height: 34px;
            box-sizing: border-box;
            cursor: pointer;

            &:hover {
                background-color: #f5f7fa;
            }
        }
    }
}
</style>