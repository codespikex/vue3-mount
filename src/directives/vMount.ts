import type {ObjectDirective}   from "@vue/runtime-core"
import {NODE_SYMBOL}            from "~/symbols"
import Node                     from "~/node"
import type {ComponentInstance} from "~/types"

interface VShowElement extends HTMLElement {
    // _vod = vue original display
    _vod: string
    _unbind: Function
}

export const vMount: ObjectDirective<VShowElement> = {
    beforeMount(el, {value = true}, {transition}) {
        el._vod = el.style.display === "none" ? "" : el.style.display

        if (transition && value) {
            transition.beforeEnter(el)
        } else {
            setDisplay(el, value)
        }
    },
    mounted(el, {value = true, instance}, {transition}) {
        const comp = instance?.$ as ComponentInstance
        if (comp) {
            const _node = comp.provides[NODE_SYMBOL as symbol] as Node
            if (_node) {
                const unmountFn = () => {
                    if (!transition) {
                        return setDisplay(el, false)
                    }

                    return new Promise((resolve: () => void) => {
                        transition.leave(el, () => {
                            setDisplay(el, false)
                            resolve()
                        })
                    }) as Promise<void>
                }

                el._unbind = _node.__unmountHook(unmountFn)
            }
        }

        if (transition && value) {
            transition.enter(el)
        }
    },
    updated(el, {value = true, oldValue = true}, {transition}) {
        if (!value === !oldValue) return
        if (transition) {
            if (value) {
                transition.beforeEnter(el)
                setDisplay(el, true)
                transition.enter(el)
            } else {
                transition.leave(el, () => {
                    setDisplay(el, false)
                })
            }
        } else {
            setDisplay(el, value)
        }
    },
    beforeUnmount(el, {value = true}) {
        setDisplay(el, value)
        el._unbind?.()
    }
}

function setDisplay(el: VShowElement, value: unknown): void {
    el.dataset["display"] = value ? el._vod : "none"
    el.style.display = value ? el._vod : "none"
}
