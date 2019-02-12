<template>
  <div id="configuration-container">
    <el-row>
      <el-col :span="5">
        <sider :layout="siderLayout" :items="siderItems" @siderSelect="siderSelect"></sider>
      </el-col>
      <el-col :span="19">
        <keep-task-detail 
          :tasks="selectItemTasks" 
          :platform="platform"
          :editMode="editMode"
          @edit="edit"></keep-task-detail>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Sider from '../../components/Sider/Sider.vue'
import KeepTaskDetail from './KeepTaskDetail.vue'

export default {
  mounted() {
    this.$http.get("http://127.0.0.1:5001/api/keep_task/list")
      .then((result) => {
        console.log(result.data)
        this.siderItems = result.data.data
      }).catch((err) => {
        console.log(err)

      });
  },
  data() {
    return {
      platform: "crawler",
      siderLayout: 2,
      siderItems: {},
      selectItemTasks: {},
      editMode: false
    }
  },
  components: {
    Sider, KeepTaskDetail
  },
  methods: {
    edit(isEdit) {
      this.editMode = isEdit
    },
    siderSelect(indexPath) {
      let field = ''
      if (this.siderLayout === 3) {
        field = indexPath.slice(1, 3).join(":")
      } else if (this.siderLayout === 2) {
        field = indexPath[1]
      }
      this.$http.get(
        "http://127.0.0.1:5001/api/keep_task/detail?platform=wscrawler&market=" + field
        )
        .then((result) => {
          this.selectItemTasks = {platform: this.platform, field, data: result.data.data}
          this.editMode = false
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
