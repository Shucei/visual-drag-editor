<template>
    <div class="event-list">
        <div class="div-events">
            <el-button @click="isShowEvent = true">添加事件</el-button>
            <div>
                <el-tag
                    v-for="event in Object.keys(curComponent.events)"
                    :key="event"
                    closable
                    @close="removeEvent(event)"
                >
                    {{ event }}
                </el-tag>
            </div>
        </div>

        <!-- 选择事件 -->
        <el-drawer
            v-model="isShowEvent"
            direction="ltr"
            :with-header="false"
            :show-close="false"
            class="modal"
        >
            <el-tabs v-model="eventActiveName">
                <el-tab-pane
                    v-for="item in eventList"
                    :key="item.key"
                    :label="item.label"
                    :name="item.key"
                >
                    <el-input
                        v-if="item.key == 'redirect'"
                        v-model="item.param"
                        type="textarea"
                        placeholder="请输入完整的 URL"
                        @keydown.native.stop
                    />
                    <el-input
                        v-if="item.key == 'alert'"
                        v-model="item.param"
                        type="textarea"
                        placeholder="请输入要 alert 的内容"
                        @keydown.native.stop
                    />
                    <el-button style="margin-top: 20px;" @click="addEvent(item.key, item.param)">确定</el-button>
                </el-tab-pane>
            </el-tabs>
        </el-drawer>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { eventList } from '@/utils/events'
import { storeToRefs } from 'pinia'
import useStore from '@/store/index.js'
const { editor } = useStore()
const { curComponent } = storeToRefs(editor)

const isShowEvent = ref(false)
const eventActiveName = ref('redirect')

const addEvent = (event, param) => {
    isShowEvent.value = false
    curComponent.value.events[event] = param
}

const removeEvent = (event) => {
    delete curComponent.value.events[event]
}


</script>

<style lang="scss" scoped>
.event-list {
    .div-events {
        text-align: center;
        padding: 0 20px;

        .el-button {
            display: inline-block;
            margin-bottom: 10px;
        }

        .el-tag {
            display: block;
            width: 50%;
            margin: auto;
            margin-bottom: 10px;
        }
    }

}

</style>
