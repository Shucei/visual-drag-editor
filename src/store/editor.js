import { defineStore } from 'pinia'
import editorData from '../data/editor.js'
const useEditorStore = defineStore('editor', {
    state: () => {
        return {
            ...editorData,
        }
    },
    actions: {
        addComponent({ component, index }) {
            if (index !== undefined) {
                this.componentData.splice(index, 0, component)
            } else {
                this.componentData.push(component)
            }
        },
    },
})

export default useEditorStore