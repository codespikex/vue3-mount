import {
    defineComponent,
    getCurrentInstance,
    PropType,
    provide,
    renderSlot, withCtx
} from "vue"

import Node                     from "~/node"
import type {ComponentInstance} from "~/types"

import {NODE_SYMBOL} from "~/symbols"

export default defineComponent({
    name: "Node",
    props: {
        node: {
            type: Object as PropType<Node>,
            required: true
        }
    },
    setup(props, {slots}) {
        const ctx = getCurrentInstance() as ComponentInstance
        if (props.node.ctx) {
            for (const key in props.node.ctx.provides)
                ctx.provides[key] = props.node.ctx.provides[key]
        }

        provide(NODE_SYMBOL, props.node)

        return withCtx(() => renderSlot(slots, "default"), ctx)
    }
})
