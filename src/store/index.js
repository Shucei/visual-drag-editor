
import useEditorStore from './editor'

// 统一导出useStore方法
export default function useStore() {
    return {
        editor: useEditorStore(),
    }
}