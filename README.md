> [!WARNING]
> This package is unmaintained and too complex for a simple wormhole solution.

## Introduction

Vue3Mount is a lightweight api for dynamically mounting Vue components.

## Features

- Supports reactive props
- Supports inject/provide api
- Provides Custom directive for handling transition
- Supports Options API

## Getting started

### 1. Using NPM

#### Install

```bash
npm install vue3-mount
// or
pnpm add vue3-mount
```

#### Register

```ts
// app.ts
import Vue3Mount from 'vue3-mount'

const app = createApp(App)
app.use(Vue3Mount)
```

### 2. CDN

#### Install

```html

<script src="https://unpkg.com/vue3-mount"></script>
```

#### Register

```js
const {Mount: Vue3Mount} = window.Vue3Mount
const app = createApp(App)
app.use(Vue3Mount)
```

## Usage

### Define a Portal

```vue
// App.vue
<template>
  <!-- Rest of the code -->
  <Portal/>
  <!-- Define a named mount target -->
  <Portal name="modals"/>
</template>
<script lang="ts" setup>
import {Portal} from "vue3-mount"
</script>
```

> At-least one portal is required.

### Mounting the component

```vue
// SomeComponent.vue
<template>
  <button @click="mountModal">Mount Modal</button>
</template>
<script lang="ts" setup>
import {h}        from "vue"
import {useMount} from "vue3-mount"
import Modal      from "./components/Modal.vue"

const mount = useMount()

function mountModal() {
  const node = mount(() => h(Modal, {
    // props
  }))

  // or mount to a named mount target
  const node = mount(() => h(Modal, {
    // props
  }), 'modals')

  // unmount the component
  node.unmount()
  // or destroy the component
  node.remove()
}

</script>
```

### Using the vMount directive

```vue
// Modal.vue
<transition name="fade" appear>
    <div v-mount>
      <!-- Rest of the code -->
    </div>
</transition>
<script lang="ts" setup>
import {vMount} from "vue3-mount"
</script>
```

> vMount is a wrapper around native vShow directive, but it also handles transitions for custom mounted components.

### Unmount the component

```vue
// Modal.vue
<script lang="ts" setup>
import {getNode} from "vue3-mount"

const unmount = getNode()
// const unmount = getNode(()=> /** beforeUnmountHook */)

// unmount the component
// vMount directive will handle the transition
unmount()
// or if you want to destroy the component instantly
unmount.force()

</script>
```

### Using Options API

Mounting the component

```vue
// SomeComponent.vue
<template>
  <button @click="mountModal">Mount Modal</button>
</template>
<script lang="ts">
import {defineComponent, h} from "vue"
import Modal                from "./components/Modal.vue"

export default defineComponent({
  methods: {
    mountModal() {
      const node = this.$vueMount(() => h(Modal, {
        // props
      }))

      // or mount to a named mount target
      const node = this.$vueMount(() => h(Modal, {
        // props
      }), 'modals')

      // unmount the component
      node.unmount()
      // or destroy the component
      node.remove()
    }
  }
})

</script>
```

Accessing Node instance from Mounted component

```vue
// Modal.vue
<script lang="ts">
import {defineComponent} from "vue"
import {NodeMixin}       from "vue3-mount"

export default defineComponent({
  mixins: [NodeMixin],
  methods: {
    unmount() {
      this.$node.unmount()
    },
    destroy() {
      this.$node.remove()
    }
  }
})
</script>
```

## Todo

- Add unit tests
