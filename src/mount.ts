import {markRaw, reactive}                    from "vue"
import type {App, ComponentInternalInstance} from "vue"

import {VUE_MOUNT_SYMBOL}                  from "./symbols"
import Node                                from "./node"
import type {ComponentInstance, MountNode} from "./node"
import MountMixin                          from "~/mixin/MountMixin"

let idx = 0

export type NodeMap = Map<string, Node>
type NodeGroup = Record<string, NodeMap>

export default class Mount {

    static #_mount: Mount
    static #_mounts = new Map<App, Mount>()

    #app: App
    readonly #nodes: NodeGroup

    static install(app: App) {
        const _mount = new Mount(app)
        app.provide(VUE_MOUNT_SYMBOL, _mount)
        app.mixin(MountMixin)
        Mount.#_mount = _mount
        Mount.#_mounts.set(app, _mount)
    }

    /**
     * Get the latest instance of the Mount class
     */
    static getMount(app?: App) {
        if (!app) return Mount.#_mount
        return Mount.#_mounts.get(app)
    }

    constructor(app: App) {
        markRaw(this)
        this.#app = app
        this.#nodes = reactive({})
    }

    /**
     * Get all the available vNodes for a specific mount target
     * @internal
     * @param target
     */
    getNodes(target: string = "default") {
        if (!this.#nodes[target])
            this.#nodes[target] = new Map()

        return this.#nodes[target]
    }

    #getId(target: string) {
        const id = ++idx
        return `${target}-${id}`
    }

    mount(vnode: MountNode, target: string = "default", ctx?: ComponentInternalInstance | null) {
        const id = this.#getId(target)

        if (!this.#nodes[target])
            this.#nodes[target] = new Map()

        const node = new Node({vnode, target, id, ctx: ctx as ComponentInstance, vueMount: this})
        this.#nodes[target].set(id, node)
        return node
    }

    deleteNode(node: Node) {
        if (!this.#nodes[node.target]) return
        this.#nodes[node.target].delete(node.id)
    }
}
