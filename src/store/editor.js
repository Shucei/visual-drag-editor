import { defineStore } from 'pinia'
import editorData from '../data/editor.js'
const useEditorStore = defineStore('editor', {
    state: () => {
        return {
            ...editorData,
            editorRef: null,
            curComponentRef: null,
            lines: {
                x: null,
                y: null,
            },

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
        // 删除组件
        deleteComponent (index) {
            if (index === undefined) {
                index = this.curComponentIndex
            }

            if (index == this.curComponentIndex) {
                this.curComponentIndex = null
                this.curComponent = null
                this.curComponentRef = null
            }

            if (/\d/.test(index)) {
                this.componentData.splice(index, 1)
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
        setCurComponent ({ component, index, componentRef }) {
            this.curComponent = component
            this.curComponentIndex = index
            this.curComponentRef = componentRef
        },

        // 设置当前选中组件的属性
        setInEditorStatus (status) {
            this.isInEdiotr = status
        },
        // 设置点击组件状态
        setClickComponentStatus (status) {
            this.isClickComponent = status
        },

        // 设置组件数据(用于撤销恢复)
        setComponentData (componentData) {
            this.componentData = componentData
        },

        // 设置组件宽高(由于是ui组件库，所以需要渲染后通过ref才能获取宽高)
        setComponentWH ({ width, height, component }) {
            const cur = this.componentData.find(item => item.id === component.id)
            cur.style.width = width
            cur.style.height = height
        },

        // 设置标线
        setLines ({ x, y }) {
            this.lines = {
                x,
                y,
            }
        },
    },
})

export default useEditorStore