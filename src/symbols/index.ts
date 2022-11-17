import {InjectionKey} from "vue"
import Mount          from "~/mount"
import Node           from "~/node"

export const VUE_MOUNT_SYMBOL: InjectionKey<Mount> = Symbol("VUE_MOUNT")
export const NODE_SYMBOL: InjectionKey<Node> = Symbol("NODE")
export const MIXIN_MAP_SYMBOL = Symbol("MIXIN_MAP")
