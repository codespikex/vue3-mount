import {App, ComponentInternalInstance, markRaw, reactive} from "vue"

import {MOUNT}           from "./symbols"
import Node, {MountNode} from "./node"

let key = 0

export default class Mount {

    static #instance: Mount

    static install(app: App) {
        const instance = new Mount(app)
        app.provide(MOUNT, instance)
        Mount.#instance = instance
    }

    /**
     * Get the latest instance of the Mount class
     */
    static get instance() {
        return Mount.#instance
    }

    #app: App
    #nodes = reactive<Record<string, Set<Node>>>({})

    constructor(app: App) {
        markRaw(this)
        this.#app = app
    }

    /**
     * Get all the available vNodes for a specific mount target
     * @param target
     */
    getNodesFor(target: string = "default") {
        if (!this.#nodes[target])
            this.#nodes[target] = new Set()
        return this.#nodes[target]
    }

    protected getId(target: string) {
        const id = ++key
        return `${target}-${id}`
    }


    mount(vnode: MountNode, target: string = "default", ctx?: ComponentInternalInstance | null) {
        const id = this.getId(target)

        if (!this.#nodes[target])
            this.#nodes[target] = new Set()

        const nodes = this.#nodes[target]

        const node = new Node(vnode, id, target, this, ctx)
        nodes.add(node)
        return node
    }

    removeNode(node: Node) {
        if (!this.#nodes[node.target]) return
        this.#nodes[node.target].delete(node)
    }
}
