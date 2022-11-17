<template>
  <p><slot></slot></p>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
  name: "Paragraph"
})
</script>
