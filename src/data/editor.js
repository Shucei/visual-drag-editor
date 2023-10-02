export default {
    editMode: 'edit', // 编辑器模式 edit preview
    canvasStyleData: { // 页面全局数据
        width: 1200, // 画布宽度
        height: 800, // 画布高度
        scale: 100, // 画布缩放比例
        color: '#000', // 画布背景颜色
        opacity: 1, // 画布背景透明度
        backgroundColor: '#fff', // 画布背景图片
        fontSize: 14, // 画布字体大小
    },
    isInEdiotr: false, // 是否在编辑器中，用于判断复制、粘贴组件时是否生效，如果在编辑器外，则无视这些操作
    componentData: [
        // eslint-disable-next-line max-len
    ], // 画布组件数据
    curComponent: null, // 当前选中的组件
    curComponentIndex: null, // 当前选中的组件索引
    // 点击画布时是否点中组件，主要用于取消选中组件用。
    // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
    isClickComponent: false,
}