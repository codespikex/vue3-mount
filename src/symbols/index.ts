import {InjectionKey} from "vue"
import Mount          from "~/mount"
import Node           from "~/node"

export const MOUNT: InjectionKey<Mount> = Symbol("Mount")
export const NODE: InjectionKey<Node> = Symbol("Node")
export const MOUNTED_NODES = Symbol("MountedNodes")
