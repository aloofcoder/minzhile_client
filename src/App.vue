<template>
  <div class="layout-app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>
<style>
  .layout-app {
    width: 100%;
    height: 100%;
    display: flex;
  }
</style>
