
import useEditorStore from './editor'
import useComposeStore from './compose'
// 统一导出useStore方法
export default function useStore() {
    return {
        editor: useEditorStore(),
        compose: useComposeStore(),
    }
}