import Mount                                               from "~/mount"
import type {MountNode}                                    from "~/node"
import {getCurrentInstance, inject, onBeforeUnmount, warn} from "vue"
import Node                                                from "~/node"
import {__DEV__}                                           from "~/utils"
import {MOUNT}                                             from "~/symbols"

export type UseMountOptions = {
    /**
     * Destroy all the mounted components when the
     * parent components gets unmounted
     */
    destroyOnUnmount?: boolean
}

export default function useMount(options: UseMountOptions = {}) {

    const {
        destroyOnUnmount = true
    } = options

    const ctx = getCurrentInstance()
    const instance = ctx ? inject(MOUNT, Mount.instance) : Mount.instance

    if (!instance && __DEV__) {
        warn("Please install the Mount plugin before using the useMount hook")
    }

    let mountedNodes = null as unknown as Set<Node>

    if (ctx && destroyOnUnmount) {
        mountedNodes = new Set()
        onBeforeUnmount(() => {
            mountedNodes
                .forEach((node) => node.unmount())
            mountedNodes.clear()
        })
    }

    if (!ctx && destroyOnUnmount && __DEV__) {
        warn("Please disable the destroyOnUnmount option when the hook is used outside of a setup scope.")
    }

    return function (vnode: MountNode, target: string = "default") {
        const node = instance.mount(vnode, target, ctx)
        if (destroyOnUnmount && mountedNodes) {
            node.onRemove(() => mountedNodes.delete(node))
            mountedNodes.add(node)
        }
        return node
    }
}
