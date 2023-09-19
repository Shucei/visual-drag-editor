<template>
    <div class="component-list" @dragstart="handleDragStart">
        <div
            v-for="(item, index) in registerConfig.componentList"
            :key="index"
            class="list"
            draggable
            :data-index="index"
        >
            <span v-if="item.icon.substr(0, 2) === 'el'" :class="item.icon"></span>
            <span v-else class="iconfont" :class="'icon-' + item.icon"></span>
        </div>
    </div>
</template>

<script setup>
import { registerConfig } from '@/data/components-list'
import { inject } from 'vue'

inject('registerConfig')

const  handleDragStart = (e) => {
    e.dataTransfer.setData('index', e.target.dataset.index) // 设置拖拽数据
    console.log(e)

}
</script>

<style lang="scss" scoped>
.component-list {
    height: 65%;
    padding: 10px;
    display: grid;
    grid-gap: 10px 19px;
    grid-template-columns: repeat(auto-fill, 80px);
    grid-template-rows: repeat(auto-fill, 40px);
    justify-content: center;
    .list {
        width: 80px;
        height: 40px;
        border: 1px solid #ddd;
        cursor: grab;
        text-align: center;
        color: #333;
        padding: 2px 5px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:active {
            cursor: grabbing;
        }

        .iconfont {
            margin-right: 4px;
            font-size: 20px;
        }

        .icon-text,
        .icon-input {
            font-size: 25px;
        }

        .icon-button {
            font-size: 25px;
        }
    }
}
</style>
