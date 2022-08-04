<template>
  <p>This node will unmount in {{ time }}</p>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {NodeMixin}       from "~/index"

export default defineComponent({
  name: "OptionsApiTest",
  mixins: [NodeMixin],
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
