import { ElText,ElButton,ElInput } from 'element-plus'

function createEditorConfig() {
    const componentList = []
    const componentMap = {}

    return {
        componentList,
        componentMap,
        register:(config) => {
            componentList.push(config)
            componentMap[config.name] = config
        },
    }
}

export let registerConfig = createEditorConfig()

registerConfig.register({
    name: 'Button',
    icon: 'button',
    label: '按钮',
    preview: () => <ElButton>按钮</ElButton>,
    render: () => <ElButton>按钮</ElButton>,
    props: {
        type: {
            type: 'select',
            options: ['primary', 'success', 'warning', 'danger', 'info', 'text'],
            default: 'primary',
            label: '类型',
        },
        size: {
            type: 'select',
            options: ['medium', 'small', 'mini'],
            default: 'medium',
            label: '尺寸',
        },
        plain: {
            type: 'boolean',
            default: false,
            label: '朴素按钮',
        },
        round: {
            type: 'boolean',
            default: false,
            label: '圆角按钮',
        },
        circle: {
            type: 'boolean',
            default: false,
            label: '圆形按钮',
        },
        loading: {
            type: 'boolean',
            default: false,
            label: '加载中',
        },
    },
})

registerConfig.register({
    name: 'Text',
    icon: 'text',
    label: '文本',
    preview: () => <ElText>文本</ElText>,
    render: () => <ElText>文本</ElText>,
    props: {
        content: {
            type: 'input',
            default: '文本',
            label: '文本内容',
        },
    },
})

registerConfig.register({
    name: 'Input',
    icon: 'input',
    label: '输入框',
    preview: () =><ElInput>Input</ElInput>,
    render: () => <ElInput />,
    props: {
        placeholder: {
            type: 'input',
            default: '请输入',
            label: '占位提示文字',
        },
    },
})