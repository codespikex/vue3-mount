import {markRaw}                           from "vue"
import type {MountNode, ComponentInstance} from "~/types"

import Mount from "~/mount"

export type NodeOptions = {
    vnode: MountNode
    id: string
    to: string
    ctx?: ComponentInstance
    vueMount: Mount
}

export default class Node {

    readonly vnode: MountNode
    readonly id: string
    readonly to: string

    readonly ctx?: ComponentInstance
    readonly #vueMount: Mount
    #um: Function[] = []
    #rm: Function[] = []
    #unmounted = false

    constructor({vnode, id, to, vueMount, ctx}: NodeOptions) {
        markRaw(this)
        this.vnode = vnode
        this.id = id
        this.to = to
        this.#vueMount = vueMount
        this.ctx = ctx
    }

    /**
     * @internal
     */
    __unmountHook(hook: Function) {
        this.#um.push(hook)
        return () => {
            const idx = this.#um.indexOf(hook)
            if (idx === -1) return
            this.#um.splice(idx, 1)
        }
    }

    /**
     * @internal
     */
    __removeHook(hook: Function) {
        this.#rm.push(hook)
    }

    remove() {
        this.#unmounted = true
        this.#rm.map((v) => v?.())
        this.#rm.length = 0
        this.#vueMount.deleteNode(this)
        return true
    }

    async unmount() {
        if (this.#unmounted) return false
        this.#unmounted = true
        await this.#transition()
        return this.remove()
    }

    #transition() {
        return new Promise(async (r: Function) => {
            const um = this.#um
            if (!um.length) return r()
            await Promise.all(um.map(v => v?.()))
            um.length = 0
            r()
        })
    }
}
