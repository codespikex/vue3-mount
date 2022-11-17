import type {App, ComponentOptionsMixin} from "vue"

import {warn} from "vue"

import Mount              from "~/mount"
import type {NodeMap}     from "~/mount"
import {__DEV__}          from "~/utils"
import type {MountNode}   from "~/node"
import {MIXIN_MAP_SYMBOL} from "~/symbols"

export default {
    beforeCreate() {
        const ctx = this.$
        const app = ctx?.appContext?.app as App
        if (!app) return

        const vueMount = Mount.getMount(app)
        if (!vueMount) {
            if (__DEV__) {
                const appName = app._instance?.type.name ?? "app"
                warn(`Unable to find vueMount instance for app [${appName}]`)
            }
            return
        }

        const {
            destroy = true
        } = this.$options.vueMount ?? {}

        let _nodes: NodeMap
        if (destroy) {
            _nodes = new Map()
            this.$options[MIXIN_MAP_SYMBOL] = _nodes
        }

        this.$vueMount = (vnode: MountNode, target: string = "default") => {
            const node = vueMount.mount(vnode, target, ctx)
            if (destroy && _nodes) {
                node.__removeHook(() => _nodes.delete(node.id))
                _nodes.set(node.id, node)
            }
            return node
        }
    },
    beforeUnmount() {
        if (MIXIN_MAP_SYMBOL in this.$options) {
            const _nodes = this.$options[MIXIN_MAP_SYMBOL] as NodeMap
            _nodes.forEach((node) => node.unmount())
            _nodes.clear()
        }
    }
} as ComponentOptionsMixin
