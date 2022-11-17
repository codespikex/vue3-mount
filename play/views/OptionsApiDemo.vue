<template>
  <div class="container flex flex-col mx-auto justify-center items-center">
    <button
        @click="mountTest"
        type="button"
        class="w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-900 text-lg font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      Mount
    </button>
  </div>
  <MountTarget/>
</template>

<script lang="ts">
import {defineComponent, h} from "vue"
import OptionsApiTest       from "play/components/OptionsApiTest.vue"
import {MountTarget} from "~/index"

export default defineComponent({
  name: "OptionsApiDemo",
  components: {MountTarget},
  vueMount: {
    destroy: true
  },
  methods: {
    mountTest() {
      this.$vueMount(() => h(OptionsApiTest))
    }
  }
})
</script>
