<template>

  <div class="container flex gap-2 items-center justify-center py-4 mx-auto">
    <button
        v-for="name of views"
        :key="name"
        @click="changeExample(name)"
        class="underline font-medium text-xl"
    >
      {{ name }}
    </button>
  </div>

  <component :is="currentExample"/>
  <MountTarget/>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue"
import {MountTarget}          from "~/index"

const examples = Object.entries(import.meta.globEager("./views/**.vue"))
    .reduce((entries, [fileName, md]) => {
      const name = fileName
          .replace("./views/", "")
          .replace(".vue", "")

      entries[name] = (md as any).default
      return entries
    }, {})

export default defineComponent({
  name: "App",
  components: {
    ...examples,
    MountTarget
  },
  setup() {

    const views = Array.from(Object.keys(examples))
    const currentExample = ref(views[0])

    function changeExample(name: string) {
      currentExample.value = name
    }

    return {
      views,
      currentExample,
      changeExample
    }
  }
})
</script>
