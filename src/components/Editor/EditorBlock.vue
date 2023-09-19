<template>
    <div class="editor-block" :style="blockStyle">
        <!-- 由于组件存在不同的props需要进行if判断操作不同的props，自定义组件可以做统一的处理 -->
        <component
            :is="componentConfig"
            v-if="block.component.startsWith('Input')"
            v-model="block.label"
            :type="block.propValue.type.default"
        ></component>
        <component
            :is="componentConfig"
            v-if="block.component.startsWith('Text')"
            :type="block.propValue.type.default"
            :size="block.propValue.size.default"
            :truncated="block.propValue.truncated.default"
            v-text="block.propValue.content"
        ></component>
        <component
            :is="componentConfig"
            v-if="block.component.startsWith('Button')"
            :type="block.propValue.type.default"
            :size="block.propValue.size.default"
            :disabled="block.propValue.disabled.default"
            :plain="block.propValue.plain.default"
            :round="block.propValue.round.default"
            :circle="block.propValue.circle.default"
            :color="block.propValue.color.default"
            :loading="block.propValue.loading.default"
            v-text="block.propValue.content"
        ></component>
    </div>
</template>

<script setup>
import { computed, ref, defineProps, inject, onMounted } from 'vue'


const props = defineProps({
    block: {
        type: Object,
        default: () => ({}),
    },
})

const registerConfig = inject('registerConfig')

const blockStyle = computed(() => ({
    top: props.block.style.top + 'px',
    left: props.block.style.left + 'px',
    zIndex: props.block.style.zIndex,
}))
const componentConfig = ref(null)
onMounted(() => {
    const component = props.block.component
    componentConfig.value = registerConfig.componentMap[component].render()
})
</script>

<style lang="scss" scoped>
.editor-block{
    position: absolute;
}
</style>