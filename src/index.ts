import Mount from "./mount"

import Portal from "./components/Portal"

import {vMount} from "~/directives/vMount"

import useMount               from "./composable/useMount"
import getNode                from "./composable/getNode"
import type {UseMountOptions} from "~/composable/useMount"

import Node, {MountNode} from "~/node"
import NodeMixin         from "~/mixin/NodeMixin"

export default Mount

export const useMountNode = getNode
export const MountTarget = Portal

export {
    Mount,
    useMount,
    getNode,
    Portal,
    vMount,

    NodeMixin
}

declare module "@vue/runtime-core" {
    export interface ComponentCustomProperties {
        /**
         * Mount a component using the vue3-mount api
         */
        $vueMount(vnode: MountNode, target?: string): Node

        /**
         * Access the mounted component node
         */
        $node: Node
    }

    export interface ComponentCustomOptions {
        vueMount?: UseMountOptions
    }
}
