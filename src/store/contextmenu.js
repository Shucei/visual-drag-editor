
import { defineStore } from 'pinia'

const useContextmenuStore = defineStore('contextmenu', {
    state: () => {
        return {
            menuTop: 0, // 右击菜单数据
            menuLeft: 0,
            menuShow: false, // 右击菜单是否显示
        }
    },
    actions: {
        showContextMenu( { top, left }) {
            this.menuShow = true
            this.menuTop = top
            this.menuLeft = left
        },

        hideContextMenu() {
            this.menuShow = false
        },
    },
})

export default useContextmenuStore

