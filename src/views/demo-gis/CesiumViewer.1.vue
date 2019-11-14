<template>
  <div id="cesiumContainer" class="fullSize"></div>
</template>

<script>
import 'cesium/Widgets/widgets.css'
// import Cesium from 'cesium/Cesium'
let Cesium = require('cesium/Cesium')
export default {
  name: 'CesiumViewer',
  mounted() {
    var viewer = new Cesium.Viewer('cesiumContainer')
    console.log(viewer)
  }
}
</script>

<style scoped>
.fullSize {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  border: none;
  width: 100%;
  height: 100%;
}
</style>