
import { defineStore } from 'pinia'
import editor from './editor'
import { toast, swap, deepCopy,generateID } from '@/utils/utils'

const editorState = editor()

// 恢复上一次剪切的数据
function restorePreCutData () {
    if (this.isCut && this.copyData) { // 如果重复剪切，需要恢复上一次剪切的数据
        const data = deepCopy(this.copyData.data)
        const index = this.copyData.index
        editorState.addComponent({ component: data, index })
        if (editorState.curComponentIndex >= index) {
            // 如果当前组件索引大于等于插入索引，需要加一，因为当前组件往后移了一位
            editorState.curComponentIndex++
        }
    }
}

// 深拷贝
function deepCopyHelper(data) {
    const result = deepCopy(data)
    result.id = generateID()
    if (result.component === 'Group') { // 如果是组合组件，需要递归拷贝子组件
        result.propValue.forEach((component, i) => {
            result.propValue[i] = deepCopyHelper(component)
        })
    }

    return result
}

// 复制数据
function copyDataComponent () {
    this.copyData = {
        data: deepCopy(editorState.curComponent),
        index: editorState.curComponentIndex,
    }
}

const useContextmenuStore = defineStore('contextmenu', {
    state: () => {
        return {
            menuTop: 0, // 右击菜单数据
            menuLeft: 0, // 右击菜单数据
            menuShow: false, // 右击菜单是否显示
            copyData: null, // 复制粘贴剪切
            isCut: false, // 是否是剪切
        }
    },
    actions: {
        showContextMenu ({ top, left }) {
            this.menuShow = true
            this.menuTop = top
            this.menuLeft = left
        },

        hideContextMenu () {
            this.menuShow = false
        },

        // 复制
        copyComponent () {
            if (!editorState.curComponent) {
                toast('请选择组件', 'warning')
                return
            }
            // 如果有剪切的数据，需要先将剪切的还原到画布还原
            restorePreCutData.call(this)
            copyDataComponent.call(this)
            this.isCut = false
        },

        // 粘贴
        // isMouse 表示是否是鼠标右键粘贴
        pasteComponent (isMouse) {
            if (!this.copyData) {
                toast('请选择组件','warning')
                return
            }

            const data = this.copyData.data
            // 如果是鼠标右键粘贴，需要将组件定位到鼠标位置
            if (isMouse) {
                data.style.top = this.menuTop
                data.style.left = this.menuLeft
            } else { // 如果是快捷键粘贴，需要将组件定位到画布中心
                data.style.top += 10
                data.style.left += 10
            }

            editorState.addComponent({ component: deepCopyHelper(data) })
            if (this.isCut) { // 如果是剪切，需要删除剪切的数据
                this.copyData = null
            }
        },

        // 剪切
        cutComponent () {
            if (!editorState.curComponent) {
                toast('请选择组件','warning')
                return
            }

            // 如果重复剪切，需要恢复上一次剪切的数据
            restorePreCutData.call(this)
            copyDataComponent.call(this)
            editorState.deleteComponent()
            this.isCut = true
        },

        // 锁定
        lockComponent () {
            editorState.curComponent.isLock = true
        },
        // 解锁
        unlockComponent () {
            editorState.curComponent.isLock = false
        },

        // 上移
        upComponent () {
            const { componentData, curComponentIndex } = editorState
            // 上移图层 index，表示元素在数组中越往后
            if (curComponentIndex < componentData.length - 1) {
                swap(componentData, curComponentIndex, curComponentIndex + 1)
                editorState.curComponentIndex = curComponentIndex + 1
            } else {
                toast('已经到顶了', 'warning')
            }
        },

        // 下移
        downComponent () {
            const { componentData, curComponentIndex } = editorState
            // 下移图层 index，表示元素在数组中越往前
            if (curComponentIndex > 0) {
                swap(componentData, curComponentIndex, curComponentIndex - 1)
                editorState.curComponentIndex = curComponentIndex - 1
            } else {
                toast('已经到底了', 'warning')
            }
        },

        // 置顶
        topComponent () {
            const { componentData, curComponentIndex, curComponent } = editorState
            // 置顶
            if (curComponentIndex < componentData.length - 1) {
                componentData.splice(curComponentIndex, 1)
                componentData.push(curComponent)
                editorState.curComponentIndex = componentData.length - 1
            } else {
                toast('已经到顶了', 'warning')
            }
        },

        // 置底
        bottomComponent () {
            const { componentData, curComponentIndex, curComponent } = editorState
            // 置底
            if (curComponentIndex > 0) {
                componentData.splice(curComponentIndex, 1)
                componentData.unshift(curComponent)
                editorState.curComponentIndex = 0
            } else {
                toast('已经到底了', 'warning')
            }
        },
    },
})

export default useContextmenuStore

