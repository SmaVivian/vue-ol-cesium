<template>
  <div class="g-container">
    <cmp-header></cmp-header>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import cmpHeader from '@cmp/header/index'
export default {
  components: {
    cmpHeader
  }
}
</script>