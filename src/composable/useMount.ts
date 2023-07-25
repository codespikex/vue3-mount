import {getCurrentInstance, inject, onBeforeUnmount, warn} from "vue"

import Mount                     from "~/mount"
import type {NodeMap, MountNode} from "~/types"
import type Node               from "~/node"

import {__DEV__}                            from "~/utils"
import {MIXIN_MAP_SYMBOL, VUE_MOUNT_SYMBOL} from "~/symbols"

export type UseMountOptions = {
    /**
     * Destroy all the mounted components when the
     * parent component gets unmounted
     * @default true
     */
    destroy?: boolean
    /**
     * Provides parent ctx to child nodes
     * @default true
     */
    provideCtx?: boolean

}

export default function useMount(options: UseMountOptions = {}) {

    const {
        destroy = true,
        provideCtx = true
    } = options

    const ctx = getCurrentInstance()
    const vueMount: InstanceType<typeof Mount> = (ctx ? inject(VUE_MOUNT_SYMBOL, Mount.getMount()) : Mount.getMount()) as any

    if (!vueMount && __DEV__) {
        warn("Please install the Mount plugin before using the useMount hook")
    }

    let _nodes: NodeMap = ctx?.proxy?.$options[MIXIN_MAP_SYMBOL as any]

    if (ctx && destroy) {
        _nodes = _nodes ?? new Map()
        onBeforeUnmount(() => {
            _nodes.forEach((node) => node.unmount())
            _nodes.clear()
        })

        if (ctx?.proxy?.$options && typeof ctx.proxy.$options === "object") {
            const _nodeOptions = ctx.proxy.$options
            _nodeOptions[MIXIN_MAP_SYMBOL as any] = _nodes
        }
    }

    if (!ctx && destroy && __DEV__) {
        warn("Please disable the destroy option when the hook is used outside of a setup scope.")
    }

    return function (vnode: MountNode, target: string = "default"): Node {
        let _ctx = provideCtx ? ctx : undefined
        const node = vueMount.mount(vnode, target, _ctx)
        if (destroy && _nodes) {
            node.__removeHook(() => _nodes.delete(node.id))
            _nodes.set(node.id, node)
        }
        return node
    }
}
