<template>
  <div>
    <div @click="toggle">点击转换三维</div>
    <div id="map" style="width: 500px;height:500px;margin-left:50px;"></div>
  </div>
</template>

<script>
import 'cesium/Widgets/widgets.css'
// import Cesium from 'cesium/Cesium'
let Cesium = require('cesium/Cesium')
window.Cesium = Cesium
// require('cesium/Widgets/widgets.css')
import OLCesium from 'ol-cesium'

import Map from 'ol/Map.js'
import View from 'ol/View.js'
import * as olProj from 'ol/proj.js'
import TileLayer from 'ol/layer/Tile.js'
import XYZ from 'ol/source/XYZ.js'
export default {
  name: 'CesiumViewer',
  data() {
    return {
      ol3d: ''
    }
  },
  methods: {
    toggle() {
      // const ol3d = new OLCesium({ map: map }) // map is the ol.Map instance
      // ol3d.setEnabled(true)
      this.ol3d.setEnabled(!this.ol3d.getEnabled())
    }
  },
  mounted() {
    let tileWorldImagery = new TileLayer({
      source: new XYZ({
        url:
          'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        crossOrigin: 'Anonymous'
      })
    })

    let map = new Map({
      target: 'map',
      projection: 'EPSG:3857',
      layers: [tileWorldImagery],
      view: new View({
        center: olProj.fromLonLat([134.364805, -26.710497]),
        zoom: 4,
        minZoom: 2
      })
    })
    this.ol3d = new OLCesium({ map: map }) // map is the ol.Map instance
    this.ol3d.setEnabled(true)
    // const ol3d = new OLCesium({ map: map }) // map is the ol.Map instance
    // ol3d.setEnabled(true)
    // window.ol3d = ol3d // temporary hack for easy console debugging
    // var viewer = new Cesium.Viewer('cesiumContainer')
    // console.log(viewer)
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
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>