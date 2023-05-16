<template>
  <Home />
  <!-- <Notice /> -->
  <test />
</template>

<script>
import Home from './page/HomePage.vue'
// import Notice from '@/page/NoticePage.vue'

import test from '@/page/APITest.vue'


export default {
  name: 'App',
  components: {
    Home,
    // Notice,
    test
  }
}
</script>

<style>

</style>
