export default async function runAnimation($el, animations = []) {
    const play = (animation) => new Promise(resolve => {
        const { animationTime, value = '', isLoop } = animation // 动画时间、动画名称、是否循环
        $el.style.setProperty('--time', animationTime + 's') // 设置动画时间
        $el.classList.add(value, 'animated', utilsHandle(isLoop)) // 添加动画
        const removeAnimation = () => {
            $el.removeEventListener('animationend', removeAnimation) // 移除监听
            $el.removeEventListener('animationcancel', removeAnimation) // 移除监听
            $el.classList.remove(value, 'animated', utilsHandle(isLoop)) // 移除动画
            $el.style.removeProperty('--time') // 移除动画时间
            resolve() // 动画完成
        }

        $el.addEventListener('animationend', removeAnimation) // 监听动画结束
        $el.addEventListener('animationcancel', removeAnimation) // 监听动画取消
    })

    for (let i = 0, len = animations.length; i < len; i++) {
        await play(animations[i])
    }
}

function utilsHandle(isLoop) {
    return isLoop ? 'infinite' : 'no-infinite' // 无限循环
}
