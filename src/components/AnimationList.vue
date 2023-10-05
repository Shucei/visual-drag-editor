<template>
    <div class="animation-list">
        <div class="div-animation">
            <el-button @click="isShowAnimation = true">添加动画</el-button>
            <el-button @click="previewAnimate">预览动画</el-button>
            <div>
                <el-tag
                    v-for="(tag, index) in curComponent.animations"
                    :key="index"
                    el-tag
                    closable
                    @close="removeAnimation(index)"
                >
                    {{ tag.label }}
                    <i class="cursor el-icon-setting" @click="handleAnimationSetting(index)"></i>
                </el-tag>
            </div>
        </div>

        <!-- 选择动画 -->
        <el-drawer
            v-model="isShowAnimation"
            direction="ltr"
            :with-header="false"
            :show-close="false"
            class="modal"
        >
            <el-tabs v-model="animationActiveName">
                <el-tab-pane
                    v-for="item in animationClassData"
                    :key="item.label"
                    :label="item.label"
                    :name="item.label"
                >
                    <el-scrollbar class="animate-container">
                        <div
                            v-for="animate in item.children"
                            :ref="el => setRef(el, animate.value)"
                            :key="animate.value"
                            class="animate"
                            @mouseenter="runAnimations(animate)"
                            @click="addAnimation(animate)"
                        >
                            <div>
                                {{ animate.label }}
                            </div>
                        </div>
                    </el-scrollbar>
                </el-tab-pane>
            </el-tabs>
        </el-drawer>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useStore from '@/store/index.js'
import animationClassData from '@/utils/animationClassData.js'
import runAnimation from '@/utils/runAnimation'
const { editor } = useStore()
// const { canvasStyleData } = storeToRefs(editor)
const { curComponent } = storeToRefs(editor)


const isShowAnimation = ref(false)// 是否显示动画列表

const animationActiveName = ref('进入') // 动画列表激活的tab

// 运行动画
const runAnimations =async (animate) => {
    if (animate.pending) return // 动画正在运行中
    animate.pending = true
    await runAnimation(selectRef.value[animate.value], [animate])

    // 防止无限触发同一元素的动画
    setTimeout(() => {
        animate.pending = false
    }, 100)
}

// 预览动画
const previewAnimate = () => {
    console.log('previewAnimate')
}

// 动画设置
const handleAnimationSetting = (index) => {
    console.log(index)
}

// 删除动画
const removeAnimation = (index) => {
    curComponent.animations.splice(index, 1)
}

// 添加动画
const addAnimation = (animate) => {
    // curComponent.animations.push(animate)
    console.log(animate)
    isShowAnimation.value = false
}

//动态设置ref
const selectRef = ref({})
const setRef= (el, item) => {
    if (el) {
        selectRef.value[item] = el
    }
}

</script>


<style lang="scss">
.animation-list {
    .cursor {
        cursor: pointer;
    }

    .div-animation {
        text-align: center;

        & > div {
            margin-top: 20px;
        }

        .el-tag {
            display: block;
            width: 50%;
            margin: auto;
            margin-bottom: 10px;
        }
    }
    .el-drawer__body{
        padding: 0;
    }

    .el-scrollbar__view {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding-left: 10px;

        .animate {
            cursor: pointer;
        }

        .animate > div {
            width: 100px;
            height: 60px;
            background: #f5f8fb;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 12px;
            margin-bottom: 10px;
            font-size: 12px;
            color: #333;
            border-radius: 3px;
            user-select: none;
            cursor: pointer;
        }
    }

    .modal {
        width: 400px !important;
        background: #fff;
        height: 100%;
    }
}
</style>