<template>
  <transition
      enter-active-class="duration-300"
      leave-active-class="duration-300"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
      appear
  >
  <p v-mount>This node will unmount in {{ time }}</p>
  </transition>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {NodeMixin}       from "~/index"
import {vMount}          from "~/index"

export default defineComponent({
  name: "OptionsApiTest",
  mixins: [NodeMixin],
  directives: {mount: vMount},
  data: () => ({
    time: 5
  }),
  mounted() {
    const interval = setInterval(() => {
      this.time--
      if (this.time <= 0) {
        clearInterval(interval)
        this.$node.unmount()
      }
    }, 1000)
  }
})
</script>
