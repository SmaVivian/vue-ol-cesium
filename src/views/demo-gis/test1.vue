<template>
  <div>
    <div class="btns">
      <div @click="toggle3d">打开三维/关闭三维</div>
    </div>
    <div class="left" id="map" style="width:600px;height:400px;"></div>
    <div class="right" id="map3d" style="width:900px;height:800px;position:relative;"></div>
  </div>
</template>

<script>
import 'cesium/Widgets/widgets.css'
let Cesium = require('cesium/Cesium')
window.Cesium = Cesium
// require('cesium/Widgets/widgets.css')
import OLCesium from 'ol-cesium'

// import OLCesium from 'olcs/OLCesium.js'
import olMap from 'ol/Map.js'
import olSourceOSM from 'ol/source/OSM.js'
import olLayerTile from 'ol/layer/Tile.js'
import { transform, get as getProjection } from 'ol/proj.js'
import olView from 'ol/View.js'
import { defaults as olControlDefaults } from 'ol/control.js'

import { Image as ImageLayer } from 'ol/layer.js'
import { getCenter } from 'ol/extent.js'
import Static from 'ol/source/ImageStatic.js'
// import olOverlay from 'ol/Overlay.js'
// import { toStringHDMS } from 'ol/coordinate.js'
export default {
  data() {
    return {
      ol2d: '',
      ol3d: '',
      scene: ''
    }
  },
  methods: {
    toggle3d() {
      this.ol3d.setEnabled(!this.ol3d.getEnabled())
    }
  },
  mounted() {
    Cesium.Ion.defaultAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MzAyNzUyYi0zY2QxLTQxZDItODRkOS1hNTA3MDU3ZTBiMDUiLCJpZCI6MjU0MSwiaWF0IjoxNTMzNjI1MTYwfQ.oHn1SUWJa12esu7XUUtEoc1BbEbuZpRocLetw6M6_AA'

    // const source = new olSourceOSM()
    // this.ol2d = new olMap({
    //   layers: [
    //     new olLayerTile({
    //       source
    //     })
    //   ],
    //   controls: olControlDefaults({
    //     attributionOptions: {
    //       collapsible: false
    //     }
    //   }),
    //   target: 'map',
    //   view: new olView({
    //     center: transform([-112.2, 36.06], 'EPSG:4326', 'EPSG:3857'),
    //     zoom: 11
    //   })
    // })

    // 测试1 三维地图
    // this.ol3d = new OLCesium({
    //   map: this.ol2d,
    //   target: 'map3d'
    // })
    // const scene = this.ol3d.getCesiumScene()
    // scene.terrainProvider = Cesium.createWorldTerrain()

    // 测试2 加载三维数据
    // var viewer = new Cesium.Viewer('map3d') //创建默认地图
    // var scene = viewer.scene
    // var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
    //   Cesium.Cartesian3.fromDegrees(
    //     120.62898254394531,
    //     30.02804946899414,
    //     -10.0
    //   )
    // )
    // var model = scene.primitives.add(
    //   Cesium.Model.fromGltf({
    //     // url : 'Data/modelData/abuilding.gltf',//模型文件相对路径
    //     // url: './male02.gltf', //模型文件相对路径
    //     url: '/public/model/male02.gltf', //模型文件相对路径
    //     modelMatrix: modelMatrix,
    //     scale: 0.2 //调整模型在地图中的大小
    //   })
    // )
    // viewer.camera.flyTo({
    //   //设置视角
    //   destination: Cesium.Cartesian3.fromDegrees(
    //     120.62898254394531,
    //     30.02804946899414,
    //     100.0
    //   )
    // })

    // 测试3 加载三维数据
    // var viewer = new Cesium.Viewer('map3d', {
    //   animation: false, //是否显示动画控件
    //   homeButton: true, //是否显示home键
    //   //geocoder:false,         //是否显示地名查找控件        如果设置为true，则无法查询
    //   baseLayerPicker: false, //是否显示图层选择控件
    //   timeline: false, //是否显示时间线控件
    //   fullscreenButton: true, //是否全屏显示
    //   scene3DOnly: true, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    //   infoBox: true, //是否显示点击要素之后显示的信息
    //   sceneModePicker: false, //是否显示投影方式控件  三维/二维
    //   navigationInstructionsInitiallyVisible: false,
    //   navigationHelpButton: false, //是否显示帮助信息控件
    //   selectionIndicator: false, //是否显示指示器组件
    //   //加载谷歌卫星影像
    //   imageryProvider: new Cesium.UrlTemplateImageryProvider({
    //     url: 'http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali'
    //   })
    // })
    // viewer._cesiumWidget._creditContainer.style.display = 'none' //	去除版权信息

    // viewer.imageryLayers.addImageryProvider(
    //   new Cesium.WebMapTileServiceImageryProvider({
    //     //调用影响中文注记服务
    //     url:
    //       'http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg',
    //     layer: 'tdtAnnoLayer',
    //     style: 'default',
    //     format: 'image/jpeg',
    //     tileMatrixSetID: 'GoogleMapsCompatible',
    //     show: false
    //   })
    // )
    // //加载gltf格式数据到cesium
    // var scene = viewer.scene
    // var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
    //   Cesium.Cartesian3.fromDegrees(110.62898254394531, 40.02804946899414, 6.0)
    // ) //gltf数据加载位置
    // var model = scene.primitives.add(
    //   Cesium.Model.fromGltf({
    //     // url: 'modeldata/daedata.gltf', //如果为bgltf则为.bgltf
    //     url: '/public/model/male02.gltf', //如果为bgltf则为.bgltf
    //     modelMatrix: modelMatrix,
    //     scale: 3.0 //放大倍数
    //   })
    // )
    // viewer.camera.flyTo({
    //   destination: Cesium.Cartesian3.fromDegrees(
    //     110.62898254394531,
    //     40.02804946899414,
    //     6000.0
    //   ) //相机飞入点
    // })

    // 测试4 加载图片
    const imageExtent = [-40, 50, -10, 65]
    this.ol2d = new olMap({
      layers: [
        new olLayerTile({
          source: new olSourceOSM()
        }),
        new ImageLayer({
          source: new Static({
            url: '/public/model/image-static.png',
            crossOrigin: '',
            projection: 'EPSG:4326',
            imageExtent
          })
        })
      ],
      controls: olControlDefaults({
        attributionOptions: {
          collapsible: false
        }
      }),
      target: 'map',
      view: new olView({
        center: transform(getCenter(imageExtent), 'EPSG:4326', 'EPSG:3857'),
        zoom: 4,
        projection: 'EPSG:3857'
      })
    })

    this.ol3d = new OLCesium({
      map: this.ol2d
    })
    const scene = this.ol3d.getCesiumScene()
    scene.terrainProvider = Cesium.createWorldTerrain()
    this.ol3d.setEnabled(true)
  }
}
</script>

<style lang="scss" scoped>
</style>


