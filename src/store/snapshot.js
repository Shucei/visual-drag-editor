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
        // 撤销
        revocation() {
            if (this.snapshotIndex >= 0) {
                this.snapshotIndex--
                const componentData = deepCopy(this.snapshotData[this.snapshotIndex]) || []
                if (editorState.curComponent) {
                    // 如果当前组件不在 componentData 中，则置空
                    const needClean = !componentData.find(component => editorState.curComponent.id === component.id)

                    if (needClean) {
                        editorState.setCurComponent( {
                            component: null,
                            index: null,
                        })
                    }
                }
                editorState.setComponentData( componentData)
            }
        },

        // 恢复
        recover() {
            if (this.snapshotIndex < this.snapshotData.length - 1) { // 如果不是最新的快照
                this.snapshotIndex++
                editorState.setComponentData(deepCopy(this.snapshotData[this.snapshotIndex]))
            }
        },

        // 记录快照，每次新增组件后都要调用
        recordSnapshot() {
            // 添加新的快照
            this.snapshotData[++this.snapshotIndex] = deepCopy(editorState.componentData)
            console.log(this.snapshotIndex,this.snapshotData.length - 1)
            if (this.snapshotIndex < this.snapshotData.length - 1) {// 如果不是最新的快照，需要删除后面的快照
                this.snapshotData = this.snapshotData.slice(0, this.snapshotIndex + 1)
            }
        },
    },
})

export default useSnapshotStore