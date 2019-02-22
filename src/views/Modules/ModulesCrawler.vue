<template>
  <div id="configuration-container">
    <el-row>
      <el-col :span="24">
        <mould-header :platform="platform" @uploadSuccess="uploadSuccess"></mould-header>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <left-sider 
          :layout="siderLayout" :items="siderItems" 
          @siderSelect="siderSelect">
        </left-sider>
      </el-col>
      <el-col :span="19">
        <module-detail 
          :modules="selectItemModules" :platform="platform" 
          @removeModuleSuccess="removeModuleSuccess">
        </module-detail>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MouldHeader from './MouldeHeader.vue'
import LeftSider from '../../components/Layout/LeftSider.vue'
import ModuleDetail from './ModuleDetail.vue'

export default {
  mounted() {
    this.getList()
  },
  data() {
    return {
      platform: "crawler",
      siderLayout: 2,
      siderItems: {},
      selectItemModules: {}
    }
  },
  components: {
    MouldHeader, LeftSider, ModuleDetail
  },
  methods: {
    getList() {
      this.$http.get("/api/modules/list?platform=crawler")
        .then((result) => {
          console.log(result.data)
          this.siderItems = result.data.data
        }).catch((err) => {
          console.log(err)

        });
    },
    siderSelect(indexPath) {
      let field = ''
      if (this.siderLayout === 3) {
        field = indexPath.slice(1, 3).join(":")
      } else if (this.siderLayout === 2) {
        field = indexPath[1]
      }
      this.$http.get(
        "/api/modules/detail?platform=" + this.platform + "&market=" + field
        )
        .then((result) => {
          this.selectItemModules = {platform: this.platform, field, data: result.data.data}
          console.log(result.data.data)
        }).catch((err) => {
          console.log(err)
        });
    },
    uploadSuccess() {
      console.log('Reflash Modules List')
      this.getList()
    },
    removeModuleSuccess() {
      console.log('Reflash Modules List')
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
