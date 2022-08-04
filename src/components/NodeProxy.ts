import {defineComponent, getCurrentInstance, PropType, provide} from "vue"

import Node   from "~/node"
import {NODE} from "~/symbols"

export default defineComponent({
    name: "NodeProxy",
    props: {
        node: {
            type: Object as PropType<Node>,
            required: true
        }
    },
    setup(props, {slots}) {
        const ctx = getCurrentInstance()
        provide(NODE, props.node)

        if (props.node.parentCtx) {
            //@ts-ignore
            Object.assign(ctx.provides, props.node.parentCtx.provides ?? {})
        }

        return () => slots.default?.()
    }
})
