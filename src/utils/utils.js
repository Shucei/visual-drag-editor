import { nanoid } from 'nanoid'

// 深拷贝
export function deepCopy(target) {
    if (typeof target == 'object') {
        const result = Array.isArray(target) ? [] : {}
        for (const key in target) {
            if (typeof target[key] == 'object') {
                result[key] = deepCopy(target[key])
            } else {
                result[key] = target[key]
            }
        }

        return result
    }

    return target
}


// 主要用于 Vue 的 diff 算法，为每个元素创建一个独一无二的 ID
export function generateID() {
    return nanoid()
}


const components = ['VText', 'RectShape', 'CircleShape']
export function isPreventDrop(component) { // 判断是否是不可放置的组件
    return !components.includes(component) && !component.startsWith('SVG')
}

// 消息提示
export  function toast(message = '', type = 'error', duration = 1500) {
    ElMessage({
        message,
        type,
        duration,
    })
}

// 交换数组元素
export function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
}