<template>
    <div class="home h-screen overflow-hidden">
        <Toolbar />
        <main class="flex flex-row">
            <!-- 左侧组件列表 -->
            <section class="left basis-1/6 bg-red-600">
                123
                <!-- <ComponentList />
                <RealTimeComponentList /> -->
            </section>
            <!-- 中间画布 -->
            <section class="center flex-1  bg-yellow-500">
                456
            </section>
            <!-- 右侧属性列表 -->
            <section class="right basis-1/6 bg-blue-500">
                789
            </section>
        </main>
    </div>
</template>

<script setup>
import Toolbar from '@/components/ToolBar.vue'
</script>

<style lang="scss">
    .home {
        main{
            height: 100%;
        }
    }
</style>
