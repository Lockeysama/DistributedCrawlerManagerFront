<template>
  <div id="configuration-container">
    <el-row>
      <el-col :span="5">
        <sider :layout="siderLayout" :items="siderItems" @siderSelect="siderSelect"></sider>
      </el-col>
      <el-col :span="19">
        <task-editor :task="selectItem" @removeTask="removeTask"></task-editor>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Sider from '../../components/Sider/Sider.vue'
import TaskEditor from './TaskEditor.vue'

export default {
  components: {
    Sider, TaskEditor
  },
  mounted() {
    this.$http.get("http://127.0.0.1:5001/api/task/list")
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
      selectItem: {
        s_id: "-1", s_platform: "", s_feature: "", s_url: "",
        s_method: "GET", s_proxy: "HTTP", s_timer: "Promptly",
        i_space: 60, s_headers: "", s_data: "", s_cookies: "",
        s_json: "", s_params: "", s_priority: "MIDDLE",
        b_allow_redirects: true, b_interrupt: false,
        b_valid: true, b_is_recover: true, s_desc: "",
        i_timestamp: 1, s_start_date: "", s_start_time: ""
      }
    }
  },
  methods: {
    siderSelect(indexPath) {
      let field = ''
      if (this.siderLayout === 3) {
        field = indexPath[2]
      } else if (this.siderLayout === 2) {
        field = indexPath[1]
      }
      this.$http.get(
        "http://127.0.0.1:5001/api/task/detail?feature=" + field
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

</style>
