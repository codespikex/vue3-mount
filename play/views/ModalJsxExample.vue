<template>
  <div class="flex items-center justify-center my-16">
    <button
        @click="mountModal"
        type="button"
        class="w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-900 text-lg font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      Open JSX Modal
    </button>
  </div>
  <teleport to="body">
    <MountTarget name="modal"/>
  </teleport>
</template>

<script lang="tsx" setup>
import {createTextVNode, h}    from "vue"
import {MountTarget, useMount} from "~/index"

import Modal from "play/components/Modal.vue"

const mount = useMount()

function mountModal() {
  mount(
      () => (
          <Modal onConfirm={mountModal}>{{
            header: () => "Custom heading using jsx slot",
            content: ()=> "This is custom content text using the magic of slots."
          }}</Modal>
      ),
      // () => h(Modal, {onConfirm: () => mountModal()}, {
      //   header: () => textVNode("Custom heading using slot"),
      //   content: () => textVNode("This is custom content text using the magic of slots.")
      // }),
      "modal"
  )
}

</script>
