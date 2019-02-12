<template>
  <div id="configuration-container">
    <el-row>
      <el-col :span="24">
        <mould-header :platform="platform"></mould-header>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <sider :layout="siderLayout" :items="siderItems" @siderSelect="siderSelect"></sider>
      </el-col>
      <el-col :span="19">
        <module-detail :modules="selectItemModules" :platform="platform"></module-detail>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MouldHeader from './MouldeHeader.vue'
import Sider from '../../components/Sider/Sider.vue'
import ModuleDetail from './ModuleDetail.vue'

export default {
  mounted() {
    this.$http.get("http://127.0.0.1:5001/api/modules/list?platform=parser")
      .then((result) => {
        console.log(result.data)
        this.siderItems = result.data.data
      }).catch((err) => {
        console.log(err)

      });
  },
  data() {
    return {
      platform: "parser",
      siderLayout: 2,
      siderItems: {},
      selectItemModules: {}
    }
  },
  components: {
    MouldHeader, Sider, ModuleDetail
  },
  methods: {
    siderSelect(indexPath) {
      let key = "tddc:task:config:"
      let field = ''
      if (this.siderLayout === 3) {
        field = indexPath.slice(1, 3).join(":")
      } else if (this.siderLayout === 2) {
        field = indexPath[1]
      }
      this.$http.get(
        "http://127.0.0.1:5001/api/modules/detail?platform=" + this.platform + "&market=" + field
        )
        .then((result) => {
          this.selectItemModules = {platform: this.platform, field, data: result.data.data}
          console.log(result.data.data)
        }).catch((err) => {
          console.log(err)
        });
    }
  }
}
</script>

<style lang="less" scoped>

</style>
