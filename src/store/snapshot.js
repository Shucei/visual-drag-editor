import { defineStore } from 'pinia'
import { deepCopy } from '@/utils/utils'
import editor from './editor'
const editorState = editor()

const useSnapshotStore = defineStore('snapshot', {
    state: () => {
        return {
            snapshotData: [], // 编辑器快照数据
            snapshotIndex: -1, // 快照索引
        }
    },
    actions: {
        // 记录快照，每次新增组件后都要调用
        recordSnapshot() {
            // 添加新的快照
            this.snapshotData[++this.snapshotIndex] = deepCopy(editorState.componentData)
            // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
            if (this.snapshotIndex < this.snapshotData.length - 1) {
                this.snapshotData = this.snapshotData.slice(0, this.snapshotIndex + 1)
            }
        },
    },
})

export default useSnapshotStore