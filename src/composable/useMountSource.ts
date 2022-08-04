import {inject, warn} from "vue"
import {MOUNT}        from "~/symbols"
import {__DEV__}      from "~/utils"

export default function () {
    const source = inject(MOUNT, null)
    if (source === null && __DEV__) {
        warn("[Vue3Mount] unable to inject source. Make sure you have installed the plugin.")
    }

    return source
}
