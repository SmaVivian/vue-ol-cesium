<template>
  <div>
    <div class="btns">
      <div @click="toggle3d">打开三维/关闭三维</div>
    </div>
    <div class="left" id="map" style="width:600px;height:400px;float:left;"></div>
    <div
      class="right"
      id="map3d"
      style="margin-left:20px;width:600px;height:400px;position:relative;float:left;"
    ></div>
  </div>
</template>

<script>
import 'ol/ol.css'
import 'ol-cesium/dist/olcs.css'
import 'cesium/Widgets/widgets.css'
// import Cesium from 'cesium/Cesium'
let Cesium = require('cesium/Cesium')
window.Cesium = Cesium

import OLCesium from 'ol-cesium'
import olMap from 'ol/Map.js'
import olSourceOSM from 'ol/source/OSM.js'
import olSourceXYZ from 'ol/source/XYZ.js'
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
    },
    // 测试1 三维地图
    test1() {
      const source = new olSourceOSM()
      this.ol2d = new olMap({
        layers: [
          new olLayerTile({
            source
          })
        ],
        controls: olControlDefaults({
          attributionOptions: {
            collapsible: false
          }
        }),
        target: 'map',
        view: new olView({
          center: transform([-112.2, 36.06], 'EPSG:4326', 'EPSG:3857'),
          zoom: 11
        })
      })

      this.ol3d = new OLCesium({
        map: this.ol2d,
        target: 'map3d'
      })
      const scene = this.ol3d.getCesiumScene()
      scene.terrainProvider = Cesium.createWorldTerrain()
    },
    // 测试2 加载三维数据
    test2() {
      var viewer = new Cesium.Viewer('map3d') //创建默认地图
      var scene = viewer.scene
      var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
        Cesium.Cartesian3.fromDegrees(
          120.62898254394531,
          30.02804946899414,
          -10.0
        )
      )
      var model = scene.primitives.add(
        Cesium.Model.fromGltf({
          // url : 'Data/modelData/abuilding.gltf',//模型文件相对路径
          // url: './male02.gltf', //模型文件相对路径
          url: '/public/model/male02.gltf', //模型文件相对路径
          modelMatrix: modelMatrix,
          scale: 0.2 //调整模型在地图中的大小
        })
      )
      viewer.camera.flyTo({
        //设置视角
        destination: Cesium.Cartesian3.fromDegrees(
          120.62898254394531,
          30.02804946899414,
          100.0
        )
      })
    },
    // 测试3 加载三维数据
    test3() {
      var viewer = new Cesium.Viewer('map3d', {
        animation: false, //是否显示动画控件
        homeButton: true, //是否显示home键
        //geocoder:false,         //是否显示地名查找控件        如果设置为true，则无法查询
        baseLayerPicker: false, //是否显示图层选择控件
        timeline: false, //是否显示时间线控件
        fullscreenButton: true, //是否全屏显示
        scene3DOnly: true, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
        infoBox: true, //是否显示点击要素之后显示的信息
        sceneModePicker: false, //是否显示投影方式控件  三维/二维
        navigationInstructionsInitiallyVisible: false,
        navigationHelpButton: false, //是否显示帮助信息控件
        selectionIndicator: false, //是否显示指示器组件
        //加载谷歌卫星影像
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
          url:
            'http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali'
        })
      })
      viewer._cesiumWidget._creditContainer.style.display = 'none' //	去除版权信息

      viewer.imageryLayers.addImageryProvider(
        new Cesium.WebMapTileServiceImageryProvider({
          //调用影响中文注记服务
          url:
            'http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg',
          layer: 'tdtAnnoLayer',
          style: 'default',
          format: 'image/jpeg',
          tileMatrixSetID: 'GoogleMapsCompatible',
          show: false
        })
      )
      //加载gltf格式数据到cesium
      var scene = viewer.scene
      var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
        Cesium.Cartesian3.fromDegrees(
          110.62898254394531,
          40.02804946899414,
          6.0
        )
      ) //gltf数据加载位置
      var model = scene.primitives.add(
        Cesium.Model.fromGltf({
          // url: 'modeldata/daedata.gltf', //如果为bgltf则为.bgltf
          url: '/public/model/male02.gltf', //如果为bgltf则为.bgltf
          modelMatrix: modelMatrix,
          scale: 3.0 //放大倍数
        })
      )
      // viewer.zoomTo(model)
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          110.62898254394531,
          40.02804946899414,
          6000.0
        ) //相机飞入点
      })
    },
    // 测试4 加载图片
    test4() {
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
    },
    // 测试5 加载其他地图
    test5() {
      //高德地图
      var gaodeLayer = new olLayerTile({
        //  source: new ol.source.XYZ({
        source: new olSourceXYZ({
          url:
            'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
        })
      })

      this.ol2d = new olMap({
        layers: [gaodeLayer],
        target: 'map',
        view: new olView({
          projection: 'EPSG:4326',
          zoom: 16,
          center: [108.939819, 34.37271]
          // zoom: 18,
          // center: transform([ 108.945731,34.382717], 'EPSG:4326', 'EPSG:3857')
        })
      })

      this.ol3d = new OLCesium({
        map: this.ol2d,
        target: 'map3d'
      })
      const scene = this.ol3d.getCesiumScene()
      scene.terrainProvider = Cesium.createWorldTerrain()
    },
    // 测试6 左侧地图、右侧三维联动
    test6() {
      //高德地图
      var gaodeLayer = new olLayerTile({
        //  source: new ol.source.XYZ({
        source: new olSourceXYZ({
          url:
            'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
        })
      })

      this.ol2d = new olMap({
        layers: [gaodeLayer],
        target: 'map',
        view: new olView({
          projection: 'EPSG:4326',
          zoom: 16,
          center: [116.329261, 39.897289, -10.0]
          // zoom: 18,
          // center: transform([ 108.945731,34.382717], 'EPSG:4326', 'EPSG:3857')
        })
      })

      // var viewer = new Cesium.Viewer('map3d') //创建默认地图
      // var scene = viewer.scene
      // var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
      //   Cesium.Cartesian3.fromDegrees(116.329261, 39.897289, -10.0)
      // )
      // var model = scene.primitives.add(
      //   Cesium.Model.fromGltf({
      //     // url : 'Data/modelData/abuilding.gltf',//模型文件相对路径
      //     // url: './male02.gltf', //模型文件相对路径
      //     url: '/public/model/male02.gltf', //模型文件相对路径
      //     modelMatrix: modelMatrix,
      //     scale: 0.5 //调整模型在地图中的大小
      //   })
      // )
      // viewer.camera.flyTo({
      //   //设置视角
      //   destination: Cesium.Cartesian3.fromDegrees(116.329261, 39.897289, 100.0)
      // })

      this.ol3d = new OLCesium({
        map: this.ol2d,
        target: 'map3d'
      })
      const scene = this.ol3d.getCesiumScene()
      scene.terrainProvider = Cesium.createWorldTerrain()

      var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
        Cesium.Cartesian3.fromDegrees(116.329261, 39.897289, -10.0)
      )
      var model = scene.primitives.add(
        Cesium.Model.fromGltf({
          // url : 'Data/modelData/abuilding.gltf',//模型文件相对路径
          // url: './male02.gltf', //模型文件相对路径
          url: '/public/model/male02.gltf', //模型文件相对路径
          modelMatrix: modelMatrix,
          scale: 1 //调整模型在地图中的大小
        })
      )
      // viewer.camera.flyTo({
      //   //设置视角
      //   destination: Cesium.Cartesian3.fromDegrees(116.329261, 39.897289, 100.0)
      // })
    },
    // 测试7 左侧地图、右侧三维并旋转
    test7() {
      //高德地图
      var gaodeLayer = new olLayerTile({
        //  source: new ol.source.XYZ({
        source: new olSourceXYZ({
          url:
            'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
        })
      })

      this.ol2d = new olMap({
        layers: [gaodeLayer],
        target: 'map',
        view: new olView({
          projection: 'EPSG:4326',
          zoom: 16,
          center: [116.329261, 39.897289, -10.0]
          // zoom: 18,
          // center: transform([ 108.945731,34.382717], 'EPSG:4326', 'EPSG:3857')
        })
      })

      var viewer = new Cesium.Viewer('map3d', {
        infoBox: false,
        selectionIndicator: false,
        shadows: true,
        shouldAnimate: true
      })

      function createModel(url, height) {
        viewer.entities.removeAll()

        var position = Cesium.Cartesian3.fromDegrees(
          -123.0744619,
          44.0503706,
          height
        )
        var heading = Cesium.Math.toRadians(135)
        var pitch = 0
        var roll = 0
        var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
        var orientation = Cesium.Transforms.headingPitchRollQuaternion(
          position,
          hpr
        )

        var entity = viewer.entities.add({
          name: url,
          position: position,
          orientation: orientation,
          model: {
            uri: url,
            minimumPixelSize: 128,
            maximumScale: 20000
          }
        })
        viewer.trackedEntity = entity
      }

      createModel('/public/model/male02.gltf', 0)
    },
    test8() {
      var viewer = new Cesium.Viewer('map3d', {
        infoBox: false,
        selectionIndicator: false,
        shadows: true,
        shouldAnimate: true
      })
      function createModel(url, height) {
        viewer.entities.removeAll()

        var position = Cesium.Cartesian3.fromDegrees(
          -123.0744619,
          44.0503706,
          height
        )
        var heading = Cesium.Math.toRadians(135)
        var pitch = 0
        var roll = 0
        var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
        var orientation = Cesium.Transforms.headingPitchRollQuaternion(
          position,
          hpr
        )

        var entity = viewer.entities.add({
          name: 'test',
          position: position,
          orientation: orientation,
          model: {
            uri: url,
            minimumPixelSize: 128,
            maximumScale: 20000
          }
        })
        //viewer.trackedEntity = entity;
        viewer.zoomTo(entity)
      }

      createModel('/public/model/male02.gltf', 0)
    },
    // 加载自己上传到cesium中的文件
    test9() {
      var viewer = new Cesium.Viewer('map3d')

      var tileset = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
          //  加载自己上传到cesium中的文件 my assets https://cesium.com/ion/
          url: Cesium.IonResource.fromAssetId(103468)
        })
      )

      tileset.readyPromise
        .then(function() {
          viewer.zoomTo(tileset)

          // Apply the default style if it exists
          var extras = tileset.asset.extras
          if (
            Cesium.defined(extras) &&
            Cesium.defined(extras.ion) &&
            Cesium.defined(extras.ion.defaultStyle)
          ) {
            tileset.style = new Cesium.Cesium3DTileStyle(
              extras.ion.defaultStyle
            )
          }
        })
        .otherwise(function(error) {
          console.log(error)
        })
    }
    //  加载自己上传到cesium中的文件 my assets https://cesium.com/ion/
    // test10() {
    //   var viewer = new Cesium.Viewer('map3d')

    //   var promise = Cesium.IonResource.fromAssetId(103617)
    //     .then(function(resource) {
    //       var entity = viewer.entities.add({
    //         position: Cesium.Cartesian3.fromDegrees(
    //           -123.0744619,
    //           44.0503706,
    //           0
    //         ),
    //         model: {
    //           uri: resource
    //         }
    //       })
    //       viewer.trackedEntity = entity
    //     })
    //     .otherwise(function(error) {
    //       console.log(error)
    //     })
    // }
  },
  mounted() {
    this.$nextTick(() => {
      // 3d icon修改
      Cesium.Ion.defaultAccessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZDc5YzA0My1lZjlmLTQ0NWMtYWVjMy03M2Y3MzZmYWEzYjMiLCJpZCI6Mjc4MTcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTAxMjI5Mjh9.pXP3BPaQ19RNj9cW7v3zUES4raQShf8dWvDkGF5vXHs'

      // Cesium.Ion.defaultAccessToken =
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MzAyNzUyYi0zY2QxLTQxZDItODRkOS1hNTA3MDU3ZTBiMDUiLCJpZCI6MjU0MSwiaWF0IjoxNTMzNjI1MTYwfQ.oHn1SUWJa12esu7XUUtEoc1BbEbuZpRocLetw6M6_AA'

      // this.test1() // 测试1 三维地图
      // this.test2() // 测试2 加载三维数据
      // this.test3() // 测试3 加载三维数据 gltf格式
      // this.test4() // 测试4 加载图片
      // this.test5() // 测试5 加载其他地图
      this.test6() // 测试6 左侧地图、右侧三维数据
      // this.test7() // 测试7 左侧地图、右侧三维数据并旋转
      // this.test8() // 测试8 entities zoomTo三维模型
      // this.test9() // 测试9 primitives zoomTo三维模型
      // this.test10() // 测试10 //  加载自己上传到cesium中的文件
    })
  }
}
</script>

<style lang="scss" scoped>
</style>


