import {markRaw, reactive}                   from "vue"
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
     * @param name
     */
    getNodes(name: string = "portal") {
        if (!this.#nodes[name])
            this.#nodes[name] = new Map()

        return this.#nodes[name]
    }

    #getId(target: string) {
        const id = ++idx
        return `${target}-${id}`
    }

    createNode(vnode: MountNode, to: string = "portal", ctx?: ComponentInternalInstance | null) {
        const id = this.#getId(to)

        return new Node({vnode, id, to, ctx: ctx as ComponentInstance, vueMount: this})
    }

    addNode(node: Node) {
        if (!this.#nodes[node.to])
            this.#nodes[node.to] = new Map()

        this.#nodes[node.to].set(node.id, node)
        return node
    }

    mount(vnode: MountNode, to: string = "portal", ctx?: ComponentInternalInstance | null) {
        const node = this.createNode(vnode, to, ctx)
        return this.addNode(node)
    }

    deleteNode(node: Node) {
        if (!this.#nodes[node.to]) return
        this.#nodes[node.to].delete(node.id)
    }
}
