import { defineStore } from 'pinia'
import editorData from '../data/editor.js'
const useEditorStore = defineStore('editor', {
    state: () => {
        return {
            ...editorData,
        }
    },
    actions: {
        // 添加组件
        addComponent ({ component, index }) {
            if (index !== undefined) {
                this.componentData.splice(index, 0, component)
            } else {
                this.componentData.push(component)
            }
        },
        // 移动组件
        setShapeStyle ({ top, left, width, height, rotate }) {
            if (top !== undefined) this.curComponent.style.top = Math.round(top)
            if (left !== undefined) this.curComponent.style.left = Math.round(left)
            if (width) this.curComponent.style.width = Math.round(width)
            if (height) this.curComponent.style.height = Math.round(height)
            if (rotate) this.curComponent.style.rotate = Math.round(rotate)
        },
        // 设置当前选中组件
        setCurComponent ({ component, index }) {
            this.curComponent = component
            this.curComponentIndex = index
        },

        setInEditorStatus(status) {
            this.isInEdiotr = status
        },
        // 设置点击组件状态
        setClickComponentStatus(status) {
            this.isClickComponent = status
        },

    },
})

export default useEditorStore