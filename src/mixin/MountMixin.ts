import type {App, ComponentOptionsMixin} from "vue"

import {warn} from "vue"

import Mount             from "~/mount"
import {__DEV__}         from "~/utils"
import Node, {MountNode} from "~/node"
import {MOUNTED_NODES}   from "~/symbols"


export default {
    beforeCreate() {
        const ctx = this.$
        const app = ctx?.appContext?.app as App
        if (!app) return

        const instance = Mount.getInstanceFor(app)
        if (!instance) {
            if (__DEV__) {
                const appName = app._instance?.type.name ?? "app"
                warn(`Unable to find mount instance for app [${appName}]`)
            }
            return
        }

        const {
            destroyOnUnmount = true
        } = this.$options.mountOptions ?? {}

        let mountedNodes = null as unknown as Set<Node>
        if (destroyOnUnmount) {
            mountedNodes = new Set()
            this.$options[MOUNTED_NODES] = mountedNodes
        }

        this.$mount = (vnode: MountNode, target: string = "default") => {
            const node = instance.mount(vnode, target, ctx)
            if (destroyOnUnmount && mountedNodes) {
                node.onRemove(() => mountedNodes.delete(node))
                mountedNodes.add(node)
            }
            return node
        }
    },
    beforeUnmount() {

        if (MOUNTED_NODES in this.$options) {
            const nodes = this.$options[MOUNTED_NODES] as Set<Node>
            nodes.forEach((node: Node) => node.unmount())
            nodes.clear()
        }
    }
} as ComponentOptionsMixin
