import {
    defineComponent,
    Fragment,
    h,
    renderList,
} from "vue"

import Node        from "./Node"
import getVueMount from "~/composable/getVueMount"

export default defineComponent({
    name: "Portal",
    props: {
        name: {
            type: String,
            default: () => "portal"
        }
    },
    setup(props) {
        const vueMount = getVueMount()
        if (!vueMount) {
            return () => h(Fragment)
        }

        return () => {
            const _map = vueMount.getNodes(props.name)
            return renderList(_map, ([id, node]) => {
                return h(Node, {key: id, node}, node.vnode)
            })
        }
    }
})
