
import useEditorStore from './editor'
import useComposeStore from './compose'
import useContextmenuStore from './contextmenu'
// 统一导出useStore方法
export default function useStore() {
    return {
        editor: useEditorStore(),
        compose: useComposeStore(),
        contextmenu: useContextmenuStore(),
    }
}