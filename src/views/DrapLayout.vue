<template>
    <div class="home  h-screen overflow-hidden">
        <Toolbar />
        <main class="flex">
            <!-- 左侧组件列表 -->
            <section class="left">
                <ComponentList></ComponentList>
            </section>
            <!-- 中间画布 -->
            <section class="center  overflow-auto bg-slate-100 shadow-md">
                <div class="content">
                    <Editor />
                </div>
            </section>
            <!-- 右侧属性列表 -->
            <section class="right  bg-blue-500">
                789
            </section>
        </main>
    </div>
</template>

<script setup>
// import { storeToRefs } from 'pinia'
import { provide } from 'vue'
import Toolbar from '@/components/ToolBar.vue'
import Editor from '@/components/Editor/index.vue'
import ComponentList from '@/components/ComponentList.vue'
import { registerConfig } from '@/data/components-list.js'
// import useStore from '@/store/index.js'
// const { editor } = useStore()
provide('registerConfig', registerConfig)

</script>

<style lang="scss" scoped>
.home {
    main {
        height: 100%;

        .left,
        .right {
            width: 290px;
        }

        .center {
            width: 100%;
            height: 100%;
            padding: 20px;
            padding-bottom: 80px;
            overflow: auto;

            .content {
                width: 100%;
                height: 100%;
                overflow: auto;
            }
        }
    }
}
</style>
