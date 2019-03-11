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
        <keep-task-detail 
          :tasks="selectItemTasks" 
          :platform="platform"
          :editMode="editMode"
          :editTarget="editTarget"
          @edit="edit"
          @editSuccess="getList" @removeSuccess="getList"></keep-task-detail>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LeftSider from '../../components/Layout/LeftSider.vue'
import KeepTaskDetail from './KeepTaskDetail.vue'

export default {
  mounted() {
    this.getList()
  },
  data() {
    return {
      platform: "keepcrawler",
      siderLayout: 2,
      siderItems: {},
      selectItemTasks: {},
      editMode: false,
      editTarget: {
        "s_owner": "",
        "s_platform": "",
        "s_id": "-1",
        "s_feature": "",
        "b_valid": false,
        "i_state": 0
      }
    }
  },
  components: {
    LeftSider, KeepTaskDetail
  },
  methods: {
    getList() {
      this.$http.get("/api/keep_task/list")
        .then((result) => {
          console.log(result.data)
          if (result.data.code === -3001) {
            this.editMode = true
          } else {
            this.siderItems = result.data.data
          }
        }).catch((err) => {
          console.log(err)

        });
    },
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
        "/api/keep_task/detail?platform=keepcrawler&market=" + field
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
