<template>
  <div class="td-header">
    <el-menu
      :default-active="activeIndex" 
      mode="horizontal" 
      @select="handleSelect">
      <el-menu-item index="/Home">Home</el-menu-item>
      <el-menu-item index="/Configuration">Configuration</el-menu-item>
      <el-submenu index="/Modules">
        <template slot="title">Mudules</template>
          <el-menu-item index="/Modules/Crawler">Crawler</el-menu-item>
          <el-menu-item index="/Modules/WSCrawler">WSCrawler</el-menu-item>
          <el-menu-item index="/Modules/Parser">Parser</el-menu-item>
      </el-submenu>
      <el-submenu index="/Task">
        <template slot="title">Task</template>
        <el-menu-item index="/Task/Timing">Timing</el-menu-item>
        <el-menu-item index="/Task/Keep">Keep</el-menu-item>
      </el-submenu>
      <el-menu-item index="/Proxies">Proxies</el-menu-item>
      <el-submenu index="/Monitor">
        <template slot="title">Monitor</template>
        <el-menu-item index="/Monitor/Workers">Workers</el-menu-item>
        <el-menu-item index="/Monitor/Task">Task</el-menu-item>
        <el-menu-item index="/Monitor/Event">Event</el-menu-item>
      </el-submenu>
      <el-menu-item index="/Wedis">Wedis</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
    data() {
      return {
        activeIndex: this.$route.path 
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        this.activeIndex = key
        console.log(key, keyPath, this.activeIndex, this.$route.path);
        this.$router.push({path: key})
      }
    }
  }
</script>

<style lang="less" scope>

</style>
