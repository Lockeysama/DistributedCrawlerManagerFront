<template>
  <div id="home-container">
    <el-container>
      <el-main>
        <el-tabs type="border-card">
          <el-tab-pane label="Server">
            <services-running-status></services-running-status>
          </el-tab-pane>
          <el-tab-pane label="DC Cluster">
            <d-c-cluster-running-status></d-c-cluster-running-status>
          </el-tab-pane>
        </el-tabs>  
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ServicesRunningStatus from './ServicesRunningStatus.vue'
import DCClusterRunningStatus from './DCClusterRunningStatus.vue'

export default {
  name: 'home',
  components: {
    ServicesRunningStatus, DCClusterRunningStatus
  }
}
</script>

<style lang="less" scoped>

</style>
