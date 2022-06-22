<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: this.$route && this.$route.path
    };
  },
  watch: {
    $route(route) {
      this.path = route.path;
    }
  }
};
</script>

<style lang="scss">
  html, body {
    margin: 0;
    height: 100%;
  }

  #app {
    height: 100%;
  }
</style>