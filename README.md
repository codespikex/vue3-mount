## Introduction

Vue3Mount is a lightweight api for dynamically mounting Vue components.

## Features

- Supports reactive props
- Supports inject/provide api
- Provides Custom Transition component
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
Install
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

### Define a MountTarget

```vue
// App.vue
<template>
  <!-- Rest of the code -->
  <MountTarget/>
  <!-- Define a named mount target -->
  <MountTarget name="modals"/>
</template>
<script lang="ts" setup>
import MountTarget from "vue3-mount"
</script>
```

> At-least one mount target is required.

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

### Using the ControlledTransition component

```vue
// Modal.vue
<ControlledTransition name="fade" appear>
<!-- Rest of the code -->
</ControlledTransition>
<script lang="ts" setup>
import {ControlledTransition} from "vue3-mount"
</script>
```

> ControlledTransition is a wrapper around native Transition component and accepts all the native props

### Unmount the component

```vue
// Modal.vue
<script lang="ts" setup>
import {useMountNode} from "vue3-mount"

const unmount = useMountNode()
// const unmount = useMountNode(()=> /** beforeUnmountHook */)

// unmount the component
// the ControlledTransition animations will be played
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
      const node = this.$mount(() => h(Modal, {
        // props
      }))

      // or mount to a named mount target
      const node = this.$mount(() => h(Modal, {
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
