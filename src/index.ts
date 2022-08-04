import Mount from "./mount"

import MountTarget            from "./components/MountTarget"
import ControlledTransition   from "./components/Transition"
import useMount               from "./composable/useMount"
import useMountNode           from "./composable/useMountNode"
import type {UseMountOptions} from "~/composable/useMount"

import Node, {MountNode} from "~/node"
import NodeMixin         from "~/mixin/NodeMixin"

export default Mount

export {
    Mount,
    useMount,
    useMountNode,
    MountTarget,
    ControlledTransition,

    NodeMixin
}

declare module "@vue/runtime-core" {
    export interface ComponentCustomProperties {
        /**
         * Mount a component using the vue3-mount api
         */
        $mount(vnode: MountNode, target?: string): Node

        /**
         * Access the mounted component node
         */
        $node: Node
    }

    export interface ComponentCustomOptions {
        mountOptions?: UseMountOptions
    }
}
