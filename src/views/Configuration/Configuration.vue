<template>
  <div id="configuration-container">
    <el-row>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <sider :layout="siderLayout" :items="siderItems" @siderSelect="siderSelect"></sider>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="grid-content bg-purple" v-if="selectItem">
          <config-editor :selectItem="selectItem"></config-editor>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Sider from '../../components/Sider/Sider.vue'
import ConfigEditor from './ConfigEditor.vue'

export default {
  components: {
    Sider, ConfigEditor
  },
  mounted() {
    this.$http.get("http://127.0.0.1:5001/api/config/list")
      .then((result) => {
        this.siderItems = result.data.data
      }).catch((err) => {
        console.log(err)

      });
  },
  data() {
    return {
      siderLayout: 3,
      siderItems: {},
      selectItem: null
    }
  },
  methods: {
    siderSelect(indexPath) {
      this.$http.get(
        "http://127.0.0.1:5001/api/config/detail?platform=" 
        + indexPath[0] + "&ip=" + indexPath[1] + "&feature=" + indexPath[2]
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
        s_method: "GET", s_proxy: "HTTP", s_timer: "Promptly",
        i_space: 60, s_headers: "", s_data: "", s_cookies: "",
        s_json: "", s_params: "", s_priority: "MIDDLE",
        b_allow_redirects: true, b_interrupt: false,
        b_valid: true, b_is_recover: true, s_desc: "",
        i_timestamp: 1, s_start_date: "", s_start_time: ""
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
.bread {
  margin: 30px 0px 30px 0px;
}
</style>
