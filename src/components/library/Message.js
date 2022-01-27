import { createVNode, nextTick, render } from 'vue'
import Message from './nmMessage.vue'
let div = document.createElement('div')
div.setAttribute('class', 'nm_message')
document.body.appendChild(div)
let timer = null
export default ({ type, text, duration = 2000 }) => {
    const vnode = createVNode(Message, { type, text, duration })
    render(null, div)
    clearTimeout(timer)
    timer = null
    nextTick(() => {
        render(vnode, div)

    })
    timer = setTimeout(() => {
        clearTimeout(timer)
        render(null, div)

    }, duration + 200)
}