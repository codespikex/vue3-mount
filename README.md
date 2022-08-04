## Introduction

Vue3Mount is a lightweight api for dynamically mounting Vue components.

## Features

- Supports reactive props
- Supports inject/provide api
- Provides Custom Transition component

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
<script>
import MountTarget from "vue3-mount"

export default {
  components: {MountTarget}
}
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
import Modal      from "./components/Modal.vie"

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
import {ControlledTransition} from "vue3-mount";
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

## Todo

- Add unit tests
