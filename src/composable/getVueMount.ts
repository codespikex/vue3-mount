import {inject, warn}     from "vue"
import {VUE_MOUNT_SYMBOL} from "~/symbols"
import {__DEV__}          from "~/utils"

export default function () {
    const vueMount = inject(VUE_MOUNT_SYMBOL, null)
    if (vueMount === null && __DEV__) {
        warn("[Vue3Mount] unable to inject vueMount instance. Make sure you have installed the plugin.")
    }

    return vueMount
}
