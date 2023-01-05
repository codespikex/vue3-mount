import type {ComponentInternalInstance, VNode} from "vue"
import type Node                               from "~/node"

export type MountNode = () => VNode | VNode[]

export type ComponentInstance = ComponentInternalInstance & {
    provides: Record<string | symbol, any>
}

export type NodeMap = Map<string, Node>
