<template>
  <div id="configuration-container">
    <el-row>
      <el-col :span="5">
        <left-sider 
          :layout="siderLayout" :items="siderItems" 
          @siderSelect="siderSelect">
        </left-sider>
      </el-col>
      <el-col :span="19">
        <proxies-editor 
          :task="selectItem" @removeTask="removeTask"
          @editSuccess="getList" @removeSuccess="getList">
        </proxies-editor>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LeftSider from '../../components/Layout/LeftSider.vue'
import ProxiesEditor from './ProxiesEditor.vue'

export default {
  components: {
    LeftSider, ProxiesEditor
  },
  mounted() {
    this.getList()
  },
  data() {
    return {
      siderLayout: 3,
      siderItems: {},
      selectItem: {
        s_id: "-1", s_platform: "", s_feature: "", s_url: "",
        s_method: "GET", s_proxy: "HTTP", s_headers: "", 
        s_data: "", s_cookies: "", s_json: "", s_params: "", 
        b_valid: true, s_desc: "", i_timeout: 10
      }
    }
  },
  methods: {
    getList() {
      this.$http.get("/api/proxies/list")
        .then((result) => {
          this.siderItems = result.data.data
        }).catch((err) => {
          console.log(err)

        });
    },
    siderSelect(indexPath) {
      let field = ''
      if (this.siderLayout === 3) {
        field = indexPath[2]
      } else if (this.siderLayout === 2) {
        field = indexPath[1]
      }
      this.$http.get(
        "/api/proxies/detail?feature=" + field
        )
        .then((result) => {
          this.selectItem = result.data.data
          console.log(result.data.data)
        }).catch((err) => {
          console.log(err)
        });
    },
    removeTask(task) {
      this.selectItem = {
        s_id: "-1", s_platform: "", s_feature: "", s_url: "",
        s_method: "GET", s_proxy: "HTTP", s_headers: "", 
        s_data: "", s_cookies: "", s_json: "", s_params: "", 
        b_valid: true, s_desc: "", i_timeout: 10
      }
      let feature = task.s_feature
      let index = this.siderItems[feature[0].toUpperCase()][feature.split(".")[0]].indexOf(feature)
      this.siderItems[feature[0].toUpperCase()][feature.split(".")[0]].splice(index, 1)
      if (this.siderItems[feature[0].toUpperCase()][feature.split(".")[0]].length === 0) {
        delete this.siderItems[feature[0].toUpperCase()][feature.split(".")[0]]
        if (Object.keys(this.siderItems[feature[0].toUpperCase()]).length === 0) {
          delete this.siderItems[feature[0].toUpperCase()]
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
