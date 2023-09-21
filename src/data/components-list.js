import { ElText, ElButton, ElInput } from 'element-plus'

function createEditorConfig () {
    const componentList = []
    const componentMap = {}

    return {
        componentList,
        componentMap,
        register: (config) => {
            componentList.push(config)
            componentMap[config.component] = config
        },
    }
}

export let registerConfig = createEditorConfig()

registerConfig.register({
    component: 'Button',
    icon: 'button',
    label: '按钮',
    preview: () => <ElButton>按钮</ElButton>,
    render: () => <ElButton>按钮</ElButton>,
    animations: [], // 组件的动画
    events: {}, // 组件的事件
    propValue: {
        content: '按钮',
        type: {
            type: 'select',
            options: ['primary', 'success', 'warning', 'danger', 'info', 'text'],
            default: 'primary',
            label: '类型',
        },
        size: {
            type: 'select',
            options: ['large', 'small', 'default'],
            default: 'large',
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
        disabled: {
            type: 'boolean',
            default: false,
            label: '禁用',
        },
        color: {
            type: 'input',
            default: '',
            label: '颜色',
        },
    },
    style: { // 组件的样式
        width: 200,
        height: 33,
        fontSize: 14,
        fontWeight: 500,
        lineHeight: '',
        letterSpacing: 0,
        textAlign: '',
        color: '',
        top: 0,
        left: 0,
        rotate: 0,
        opacity: 1,

    },
})

registerConfig.register({
    component: 'Text',
    icon: 'text',
    label: '6666',
    preview: () => <ElText>文本</ElText>,
    render: () => <ElText>文本</ElText>,
    animations: [], // 组件的动画
    events: {}, // 组件的事件
    propValue: {
        content: '文本内容',
        type: {
            type: 'select',
            options: ['primary', 'success', 'warning', 'danger', 'info'],
            default: 'success',
            label: '类型',
        },
        size: {
            type: 'select',
            options: ['large', 'small', 'default'],
            default: 'large',
            label: '尺寸',
        },
        truncated: {
            type: 'boolean',
            default: false,
            label: '是否省略',
        },
    },
    style: { // 组件的样式
        width: 200,
        height: 33,
        fontSize: 14,
        fontWeight: 500,
        lineHeight: '',
        letterSpacing: 0,
        textAlign: '',
        color: '',
        top: 0,
        left: 0,
        rotate: 0,
        opacity: 1,

    },
})

registerConfig.register({
    component: 'Input', // 组件名称
    label: '输入框', // 组件label标签
    icon: 'input', // 组件图标
    preview: () => <ElInput></ElInput>,
    render: () => <ElInput ></ElInput>,
    propValue: {
        placeholder: '输入框占位文本',
        type: {
            type: 'select',
            options: ['text', 'textarea', 'password'],
            default: 'text',
            label: '类型',
        },
        modelValue: {
            type: 'input',
            default: '',
            label: '绑定值',
        },
        maxlength: {
            type: 'input',
            default: null,
            label: '最大输入长度',
        },
        ShowPassword: {
            type: 'boolean',
            default: false,
            label: '显示切换密码图标',
        },
    },
    animations: [], // 组件的动画
    events: {}, // 组件的事件
    style: { // 组件的样式
        width: 200,
        height: 33,
        fontSize: 14,
        fontWeight: 500,
        lineHeight: '',
        letterSpacing: 0,
        textAlign: '',
        color: '',
        top: 0,
        left: 0,
        rotate: 0,
        opacity: 1,

    },
})



