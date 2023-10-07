<template>
    <div
        ref="component"
        class="component"
        :style="getShapeStyle(config.style)"
        @click="onClick"
        @mouseenter="onMouseEnter"
    >
        <component
            :is="config.render()"
            v-if="config.component.startsWith('Input')"
            v-model="config.propValue.modelValue.default"
            :type="config.propValue.type.default"
            :placeholder="config.propValue.placeholder.default"
            :maxlength="config.propValue.maxlength.default"
            :show-password="config.propValue.ShowPassword.default"
        ></component>
        <component
            :is="config.render()"
            v-if="config.component.startsWith('Text')"

            :type="config.propValue.type.default"
            :size="config.propValue.size.default"
            :truncated="config.propValue.truncated.default"
            v-text="config.propValue.content.default"
        ></component>
        <component
            :is="config.render()"
            v-if="config.component.startsWith('Button')"
            :type="config.propValue.type.default"
            :size="config.propValue.size.default"
            :disabled="config.propValue.disabled.default"
            :plain="config.propValue.plain.default"
            :round="config.propValue.round.default"
            :circle="config.propValue.circle.default"
            :color="config.propValue.color.default"
            :loading="config.propValue.loading.default"
            v-text="config.propValue.content.default"
        ></component>
        <!-- <component
            :is="config.component"
            v-else
            ref="component"
            class="component"
            :style="getStyle(config.style)"
            :prop-value="config.propValue"
            :element="config"
            :request="config.request"
            :linkage="config.linkage"
        /> -->
    </div>
</template>

<script setup>
import { getShapeStyle } from '@/utils/style.js'
import runAnimation from '@/utils/runAnimation'
import { events as eventsFn } from '@/utils/events'
import { onMounted, ref } from 'vue'

const props = defineProps({
    config: {
        type: Object,
        required: true,
        default: () => ({ }),
    },
})

const component = ref(null)

onMounted(() => {
    runAnimation(component.value, props.config.animations)
})

const onClick = () => {
    const events = props.config.events
    Object.keys(events).forEach(event => {
        eventsFn[event](events[event])
    })
    // eventBus.$emit('v-click', this.config.id)
}

const onMouseEnter = () => {
    // eventBus.$emit('v-hover', this.config.id)
}
</script>

<style lang="scss" scoped>
.component {
    position: absolute;
}
</style>
