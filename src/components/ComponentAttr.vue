<template>
    <div class="attr-list">
        <el-collapse v-model="activeName" accordion @change="onChange">
            <el-collapse-item title="通用样式" name="style">
                <!-- 组件库组件 -->
                <el-form v-if="propValue">
                    <el-form-item v-for="(item, index) in curComponent.propValue" :key="index" :label="item.label">
                        <el-select v-if="(item.type === 'select') || item.type==='boolean'" v-model="item.default">
                            <el-option
                                v-for="item1 in item.options"
                                :key="item1"
                                :label="item1.toString()"
                                :value="item1"
                            ></el-option>
                        </el-select>
                        <el-input v-else v-model="item.default" />
                    </el-form-item>
                </el-form>
                <!-- 自定义组件 -->
                <el-form v-else>
                    <el-form-item v-for="({ key, label }, index) in styleData" :key="index" :label="label">
                        <el-color-picker
                            v-if="isIncludesColor(key)"
                            v-model="curComponent.style[key]"
                            show-alpha
                        ></el-color-picker>
                        <el-select v-else-if="selectKey.includes(key)" v-model="curComponent.style[key]">
                            <el-option
                                v-for="item in optionMap[key]"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                        <el-input v-else v-model.number="curComponent.style[key]" type="number" />
                    </el-form-item>
                </el-form>
            </el-collapse-item>
            <!-- <Request v-if="curComponent.request"></Request>
            <Linkage v-if="curComponent.linkage"></Linkage> -->
        </el-collapse>
    </div>
</template>

<script setup>
import { ref,onBeforeMount,watch } from 'vue'
import { storeToRefs } from 'pinia'
import useStore from '@/store/index.js'
import { styleData, textAlignOptions, borderStyleOptions, verticalAlignOptions, selectKey, optionMap } from '@/utils/attr'
const { editor } = useStore()
// const { canvasStyleData } = storeToRefs(editor)
const { curComponent } = storeToRefs(editor)
const props = defineProps({
    propValue: {
        type: Object,
        default: () => ({}),
    },
})
const activeName = ref('')

const onChange = (val) => {
    curComponent.collapseName = val
}


onBeforeMount(() => {
    activeName.value = curComponent.collapseName
})

watch(
    () => curComponent,
    (val) => {
        activeName.value = curComponent.collapseName
    },
)

const isIncludesColor = (str) => {
    return str.toLowerCase().includes('color')
}

</script>

<style lang="scss" >
.attr-list {
    .el-input-group__prepend {
        padding: 0 10px;
    }
}
</style>
