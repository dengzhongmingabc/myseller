<template>
  <div id="app">
    <my-header></my-header>
    <div>tab</div>
    <div>content</div>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  export default {
    name: 'app',
    components:{
        MyHeader:Header
    }
  }
</script>

<style>
</style>
