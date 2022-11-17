<template>
  <div class="flex items-center justify-center my-16">
    <button
        @click="mountModal"
        type="button"
        class="w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-900 text-lg font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      Open Composed JSX Modal
    </button>
  </div>
  <teleport to="body">
    <MountTarget name="modal"/>
  </teleport>
</template>

<script lang="ts" setup>
import {MountTarget} from "~/index"
import {useModal}    from "play/composable/useModal"

const mountModal = useModal()
</script>
