<template>
    <div class="mark-line">
        <div
            v-show="editor.lines.x !== null"
            class="line yline"
            :style="`left: ${editor.lines.x}px`"
        ></div>
        <div
            v-show="editor.lines.y !== null"
            class="line xline"
            :style="`top: ${editor.lines.y}px`"
        >
        </div>
    </div>
</template>

<script setup>

import useStore from '@/store/index.js'
const { editor } = useStore()



</script>


<style lang="scss" scoped>
.mark-line {
    height: 100%;
}

.line {
    background: #59c7f9;
    position: absolute;
    z-index: 1000;
}

.xline {
    width: 100%;
    height: 1px;
}

.yline {
    width: 1px;
    height: 100%;

}
</style>