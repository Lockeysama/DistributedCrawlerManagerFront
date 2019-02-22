<template>
  <div id="configuration-container">
    <el-row>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <left-sider 
            :layout="siderLayout" :items="siderItems" 
            @siderSelect="siderSelect">
          </left-sider>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="grid-content bg-purple" v-show="Object.keys(selectItem).length">
          <config-editor 
            ref="configeditor"
            @removeGroup="removeGroup"
            @removeTab="removeTab"
            @removeItem="removeItem"
            @configModify="configModify">
          </config-editor>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LeftSider from '../../components/Layout/LeftSider.vue'
import ConfigEditor from './ConfigEditor.vue'

export default {
  components: {
    LeftSider, ConfigEditor
  },
  mounted() {
    this.getList()
  },
  data() {
    return {
      siderLayout: 3,
      siderItems: {},
      selectItem: {},
      setectPath: []
    }
  },
  methods: {
    getList() {
      this.$http.get("/api/config/list")
        .then((result) => {
          this.siderItems = result.data.data
        }).catch((err) => {
          console.log(err)

        });
    },
    siderSelect(indexPath) {
      this.$http.get(
        "/api/config/detail?platform=" 
        + indexPath[0] + "&ip=" + indexPath[1] + "&feature=" + indexPath[2]
      )
        .then((result) => {
          this.selectItem = result.data.data
          this.selectPath = indexPath
          this.$refs.configeditor.initData(this.selectItem)
          console.log(result.data.data)
        }).catch((err) => {
          console.log(err)
        });
    },
    removeGroup(setting, groupName, tabName, cb) {
      let config = {}
      config[tabName] = {}
      config[tabName][groupName] = "*"
      const data = {
        path: this.selectPath,
        data: config
      }
      this.$http.post('/api/config/delete', data)
        .then(resp => {
          console.log(resp)
          cb(setting, groupName, true)
        })
        .catch(err => {
          
        })
    },
    removeTab(tabName, cb) {
      let config = {}
      config[tabName] = "*"
      const data = {
        path: this.selectPath,
        data: config
      }
      this.$http.post('/api/config/delete', data)
        .then(resp => {
          console.log(resp)
          cb(tabName, true)
        })
        .catch(err => {
          
        })
    },
    removeItem(item, itemName, groupName, tabName, cb) {
      let config = {}
      config[tabName] = {}
      config[tabName][groupName] = {}
      config[tabName][groupName][itemName] = "*"
      const data = {
        path: this.selectPath,
        data: config
      }
      this.$http.post('/api/config/delete', data)
        .then(resp => {
          console.log(resp)
          cb(item, itemName, true)
        })
        .catch(err => {
          
        })
    },
    configModify(config) {
      console.log(config)
      const data = {
        path: this.selectPath,
        data: config
      }
      this.$http.post('/api/config/edit', data)
        .then(resp => {
          console.log(resp)
        })
        .catch(err => {
          
        })
    }
  }
}
</script>

<style lang="less" scoped>
.bread {
  margin: 30px 0px 30px 0px;
}
</style>
