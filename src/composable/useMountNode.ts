import {inject} from "vue"
import {NODE}   from "~/symbols"
import Node     from "~/node"

export default function useMountNode(onUnmount?: Function) {
    const node = inject(NODE, null) as Node

    if (onUnmount) node?.onUnmount.call(node, onUnmount)
    const unmount = function () {
        node?.unmount()
    }
    unmount.force = () => {
        node?.remove()
    }

    unmount.node = node

    return unmount
}
