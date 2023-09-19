<template>
    <div class="editor-block" :style="{ blockStyle }">
        <component :is="componentConfig"></component>
    </div>
</template>

<script setup>
import { computed,ref, defineProps, inject, onMounted } from 'vue'


const props = defineProps({
    block: {
        type: Object,
        default: () => ({}),
    },
})

const registerConfig = inject('registerConfig')

const blockStyle = computed(() => ({
    top: props.block.top + 'px',
    left: props.block.left + 'px',
    zIndex: props.block.zIndex,
}))
const componentConfig = ref(null)
onMounted(() => {
    const component = props.block.component
    componentConfig.value = registerConfig.componentMap[component].render()
})


</script>

<style lang="scss" scoped></style>