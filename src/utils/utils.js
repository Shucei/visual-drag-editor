import { nanoid } from 'nanoid'

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