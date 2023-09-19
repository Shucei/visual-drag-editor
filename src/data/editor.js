export default {
    editMode: 'edit', // 编辑器模式 edit preview
    canvasStyleData: { // 页面全局数据
        width: 1200, // 画布宽度
        height: 800, // 画布高度
        scale: 100, // 画布缩放比例
        color: '#000', // 画布背景颜色
        opacity: 1, // 画布背景透明度
        background: '#fff', // 画布背景图片
        fontSize: 14, // 画布字体大小
    },
    isInEdiotr: false, // 是否在编辑器中，用于判断复制、粘贴组件时是否生效，如果在编辑器外，则无视这些操作
    componentData: [
        // eslint-disable-next-line max-len
        {
            component: 'Text', // 组件名称
            label: '文本', // 组件label标签
            propValue: '双击编辑文字', // 组件内容
            icon: 'el-icon-edit', // 组件图标
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
                zIndex: 1,
            },

        },
        {
            component: 'Button', // 组件名称
            label: '按钮', // 组件label标签
            propValue: '双击编辑文字', // 组件内容
            icon: 'el-icon-button', // 组件图标
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
                zIndex: 1,
            },

        },
    ], // 画布组件数据
    curComponent: null, // 当前选中的组件
    curComponentIndex: null, // 当前选中的组件索引
    // 点击画布时是否点中组件，主要用于取消选中组件用。
    // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
    isClickComponent: false,
}