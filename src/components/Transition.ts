import {ref, watch, warn, Transition, defineComponent} from "vue"
import {h, withCtx, renderSlot, createCommentVNode}    from "vue"

import type {WatchStopHandle} from "vue"

import useMountNode from "~/composable/useMountNode"
import {__DEV__}    from "~/utils"

export default defineComponent({
    name: "ControlledTransition",
    props: [
        "name",
        "type",
        "css",
        "duration",
        "enterFromClass",
        "enterActiveClass",
        "enterToClass",
        "appearFromClass",
        "appearActiveClass",
        "appearToClass",
        "leaveFromClass",
        "leaveActiveClass",
        "leaveToClass",
        "mode",
        "appear",
        "persisted",
        "onBeforeEnter",
        "onEnter",
        "onAfterEnter",
        "onEnterCancelled",
        "onBeforeLeave",
        "onLeave",
        "onAfterLeave",
        "onLeaveCancelled",
        "onBeforeAppear",
        "onAppear",
        "onAfterAppear",
        "onAppearCancelled"
    ],
    setup(props, {slots}) {
        const mounted = ref(true)
        const transitionedOut = ref(false)

        let onAfterLeaveProp = [onAfterLeave]
        if (props.onAfterLeave) {
            const fn = props.onAfterLeave
            if (typeof fn === "function")
                onAfterLeaveProp.unshift(fn)
            else if (Array.isArray(fn))
                onAfterLeaveProp.unshift(...props.onAfterLeave)
        }

        function onAfterLeave() {
            transitionedOut.value = true
        }

        const {node} = useMountNode(() => {
            mounted.value = false
            return new Promise((resolve: Function) => {
                let unwatch: WatchStopHandle | null = null
                unwatch = watch(() => transitionedOut.value, (value) => {
                    if (value) {
                        unwatch?.()
                        resolve()
                    }
                }, {immediate: true})
            })
        })

        if (!node && __DEV__) {
            warn("Please use ControlledTransition inside a useMount component")
        }

        return () => h(Transition, {
            ...props,
            onAfterLeave: onAfterLeaveProp,
            key: node?.id ?? 0
        }, {
            default: withCtx(() => [
                mounted.value ?
                    renderSlot(slots, "default", {key: node?.id ?? 0}) :
                    createCommentVNode("", true)
            ])
        })
    }
})
