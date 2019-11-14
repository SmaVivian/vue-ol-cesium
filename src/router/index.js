import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '@views/layout'

//使用Vue.mixin的方法拦截了路由离开事件，并在该拦截方法中实现了销毁页面缓存的功能。
Vue.mixin({
  beforeRouteLeave: function(to, from, next) {
    //此处判断是如果返回上一层，你可以根据自己的业务更改此处的判断逻辑，酌情决定是否摧毁本层缓存。
    if (
      from &&
      from.meta.rank &&
      to.meta.rank &&
      from.meta.rank >= to.meta.rank
    ) {
      if (this.$vnode && this.$vnode.data.keepAlive) {
        if (
          this.$vnode.parent &&
          this.$vnode.parent.componentInstance &&
          this.$vnode.parent.componentInstance.cache
        ) {
          if (this.$vnode.componentOptions) {
            var key =
              this.$vnode.key === null
                ? this.$vnode.componentOptions.Ctor.cid +
                  (this.$vnode.componentOptions.tag
                    ? `::${this.$vnode.componentOptions.tag}`
                    : '')
                : this.$vnode.key
            var cache = this.$vnode.parent.componentInstance.cache
            var keys = this.$vnode.parent.componentInstance.keys
            if (cache[key]) {
              if (keys.length) {
                var index = keys.indexOf(key)
                if (index > -1) {
                  keys.splice(index, 1)
                }
              }
              delete cache[key]
            }
          }
        }
      }
      this.$destroy()
    }
    next()
  }
})

// 不区分用户角色
export const constantRouterMap = [
  { path: '/demo', component: () => import('@views/demo') },
  { path: '/gis', component: () => import('@views/demo-gis/CesiumViewer') },
  { path: '/gis1', component: () => import('@views/demo-gis/test1') },
  {
    path: '/',
    name: 'index',
    component: Layout,
    meta: { title: '首页' },
    redirect: '/home',
    children: [
      // 首页
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home'),
        meta: { title: '首页', menuLevel: 1, rank: 1 }
      }
    ]
  }
]

// 区分用户角色
export const asyncRouterMap = [
  // {
  //   path: '/',
  //   name: 'index',
  //   component: Layout,
  //   meta: { title: '首页' },
  //   redirect: '/home',
  //   children: [
  //     // 首页
  //     {
  //       path: '/home',
  //       name: 'home',
  //       component: () => import('@/views/home'),
  //       meta: { title: '首页', menuLevel: 1, rank: 1 }
  //     }
  //   ]
  // }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
