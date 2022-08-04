<template>
  <ControlledTransition
      enter-active-class="duration-300"
      leave-active-class="duration-300"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
      :appear="true"
  >
    <div class="flex gap-2">
      <p>{{ injectedRef }} {{ msg }} {{ name }}!</p>
      <button @click="unmount" class="text-blue-500">Unmount</button>
    </div>
  </ControlledTransition>
</template>

<script lang="ts">
import {defineComponent, inject} from "vue"
import ControlledTransition      from "~/components/Transition"
import {useMountNode}            from "~/index"

export default defineComponent({
  name: "Reactive",
  components: {ControlledTransition},
  props: {
    msg: String,
    name: String
  },
  setup() {
    const unmount = useMountNode()

    const injectedRef = inject("text", "Not provided")

    return {
      unmount,
      injectedRef
    }
  }
})
</script>
