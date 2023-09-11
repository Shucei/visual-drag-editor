import { defineStore } from 'pinia'
import editorData from '../data/editor.js'
const useEditorStore = defineStore('editor', {
    state: () => {
        return {
            ...editorData,
        }
    },
    actions: {
        increment () {
            this.count++
        },
    },
})

export default useEditorStore