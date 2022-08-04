import {markRaw}                               from "vue"
import type {ComponentInternalInstance, VNode} from "vue"

import Mount from "~/mount"

export type MountNode = () => VNode | VNode[]

export default class Node {

    readonly vnode: MountNode
    readonly id: string
    readonly target: string

    readonly #ctx?: ComponentInternalInstance | null
    readonly #api: Mount
    #um: Function[] = []
    #rm: Function[] = []
    #unmounted = false

    get parentCtx() {
        return this.#ctx
    }

    constructor(vnode: MountNode, id: string, target: string, api: Mount, ctx?: ComponentInternalInstance | null) {
        markRaw(this)
        this.vnode = vnode
        this.id = id
        this.target = target
        this.#api = api
        this.#ctx = ctx
    }

    onUnmount(hook: Function) {
        this.#um.push(hook)
    }

    onRemove(hook: Function) {
        this.#rm.push(hook)
    }

    remove() {
        this.#unmounted = true
        this.#rm.map((v) => v?.())
        this.#rm.length = 0
        this.#api.removeNode(this)
    }

    unmount() {
        if (this.#unmounted) return
        this.#unmounted = true
        if (!this.#um.length) return this.remove()
        const cb = this.#um.map(v => v?.())
        this.#um.length = 0
        return Promise.all(cb).then(() => {
            this.remove()
            return true
        })
    }
}
