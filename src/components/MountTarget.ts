import {defineComponent, h} from "vue"

import useMountSource from "~/composable/useMountSource"
import NodeProxy      from "./NodeProxy"

export default defineComponent({
    name: "MountTarget",
    props: {
        name: {
            type: String,
            default: () => "default"
        }
    },
    setup(props) {
        const source = useMountSource()
        const nodes = source?.getNodesFor(props.name)

        return () => {
            return Array.from(nodes?.values() ?? []).map((node) => {
                return h(NodeProxy, {key: node.id, node}, () => node.vnode())
            })
        }
    }
})
