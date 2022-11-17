<template>
  <transition
      enter-active-class="duration-300"
      leave-active-class="duration-300"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
      appear
  >
    <div class="flex gap-2" v-mount>
      <p>{{ injectedRef }} {{ msg }} {{ name }}!</p>
      <button @click="unmount" class="text-blue-500">Unmount</button>
    </div>
  </transition>
</template>

<script lang="ts">
import {defineComponent, inject} from "vue"
import {vMount}  from "~/index"
import {getNode} from "~/index"

export default defineComponent({
  name: "Reactive",
  directives: {mount: vMount},
  props: {
    msg: String,
    name: String
  },
  setup() {
    const unmount = getNode()

    const injectedRef = inject("text", "Not provided")

    return {
      unmount,
      injectedRef
    }
  }
})
</script>
