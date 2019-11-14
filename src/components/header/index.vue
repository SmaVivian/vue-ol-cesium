<template>
  <div class="cmp-header">
    <h1>博物馆智慧协同平台</h1>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.cmp-header {
  width: 100%;
  height: $headerHeight;
  line-height: $headerHeight;
  padding-left: 20px;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  background-color: #404560;
  color: #fff;
}
</style>


