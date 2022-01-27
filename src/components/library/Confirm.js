import Confirm from './nmConfirm.vue'
import { render, createVNode } from 'vue'
let div = document.createElement('div')
div.setAttribute('class', 'nm_confirm')
document.body.appendChild(div)
export default ({ title, content }) => {
    return new Promise((res, rej) => {
        const cancelEvent = () => {
            render(null, div)

            rej()
        }
        const confirmEvent = () => {
            render(null, div)

            res()
        }
        let vnode = createVNode(Confirm, { title, content, confirmEvent, cancelEvent })
        render(vnode, div)
    })
}