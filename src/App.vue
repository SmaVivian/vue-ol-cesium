<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    console.log('store', this.$store)
  }
}
</script>

<style lang="scss">
@import './assets/css/reset.css';
@import './assets/css/element-variables.scss';
@import '~@/assets/css/theme.scss';
</style>

