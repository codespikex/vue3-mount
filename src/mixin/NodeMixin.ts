import {ComponentOptionsMixin} from "vue"
import {NODE_SYMBOL}           from "~/symbols"

export default {
    inject: {
        $node: NODE_SYMBOL
    }
} as ComponentOptionsMixin
