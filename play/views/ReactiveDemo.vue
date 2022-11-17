<template>
  <div class="flex items-end justify-center my-16 gap-2">
    <div>
      <label for="text" class="block text-sm font-medium text-gray-700">Provide Text</label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <input
            v-model="providedRef"
            type="text"
            id="text"
            class="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 sm:text-sm border-gray-300 rounded-md"
        >
      </div>
    </div>
    <div>
      <label for="msg" class="block text-sm font-medium text-gray-700">Ref Msg</label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <input
            v-model="inputRef"
            type="text"
            id="msg"
            class="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 sm:text-sm border-gray-300 rounded-md"
        >
      </div>
    </div>
    <div>
      <label for="price" class="block text-sm font-medium text-gray-700">Reactive Name</label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <input
            type="text"
            id="name"
            v-model="form.name"
            class="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 sm:text-sm border-gray-300 rounded-md"
        >
      </div>
    </div>

    <button
        @click="mountReactive"
        type="button"
        class="w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-900 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      Mount
    </button>
  </div>
  <div class="container mx-auto text-center items-center flex flex-col">
    <MountTarget name="reactive"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, h, provide, reactive, ref} from "vue"
import {useMount}                                   from "~/index"
import HelloWorld                                   from "play/components/HelloWorld.vue"
import MountTarget                                  from "~/index"

export default defineComponent({
  name: "ReactiveDemo",
  components: {MountTarget},
  setup() {

    const inputRef = ref("Hello")
    const providedRef = ref("Msg:")
    const form = reactive({
      name: "Kitty"
    })
    provide("text", providedRef)

    const mount = useMount()

    function mountReactive() {
      mount(() => h(HelloWorld, {
        msg: inputRef.value,
        name: form.name
      }), "reactive")
    }

    return {
      inputRef,
      form,
      providedRef,

      mountReactive
    }
  }
})
</script>
