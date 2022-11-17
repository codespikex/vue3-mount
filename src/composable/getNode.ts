import {inject}      from "vue"
import {NODE_SYMBOL} from "~/symbols"
import Node          from "~/node"

export default function getNode(unmountHook?: () => void | Promise<void>) {
    const node = inject(NODE_SYMBOL, null) as Node

    if (unmountHook) node?.__unmountHook.call(node, unmountHook)
    const unmount = function () {
        node?.unmount()
    }
    unmount.force = () => {
        node?.remove()
    }

    unmount.node = node

    return unmount
}
