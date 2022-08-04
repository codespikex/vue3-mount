import {ComponentOptionsMixin} from "vue"
import {NODE}                  from "~/symbols"

export default {
    inject: {
        $node: NODE
    }
} as ComponentOptionsMixin
