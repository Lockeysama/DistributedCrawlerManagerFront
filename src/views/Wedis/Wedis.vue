<template>
  <div id="configuration-container">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="wedis-path">
          <el-breadcrumb-item >Crawler</el-breadcrumb-item>
          <el-breadcrumb-item>127.0.0.1</el-breadcrumb-item>
          <el-breadcrumb-item>dc1c1</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <wedis-tree @nodeClick="nodeClick" @cmdClick="cmdClick"></wedis-tree>
      </el-col>
      <el-col :span="19">
        <el-row>
          <command-line @cmdClick="cmdClick"></command-line>
        </el-row>
        <el-row>
          <quick-query @cmdClick="cmdClick"></quick-query>
        </el-row>
        <el-row>
          <el-col :span="24">
              <el-input class="wedis-result"
              type="textarea"
              :autosize="{ minRows: 10}"
              :value="queryResult"
              disabled>
            </el-input>
          </el-col>
          
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import WedisTree from './WedisTree.vue'
import CommandLine from './CommandLine.vue'
import QuickQuery from './QuickQuery.vue'

export default {
  components: {
    WedisTree, CommandLine, QuickQuery
  },
  data() {
    return {
      queryResult: ''
    }
  },
  methods: {
    nodeClick(key) {
      console.log(key)
      this.$http.get('http://127.0.0.1:5001/api/redis/query?key=' + key)
        .then((result) => {
          console.log(result.data)
          this.queryResult = JSON.stringify(result.data, null, 2)
        }).catch((err) => {
          console.log(err) 
        });
    },
    cmdClick(cmd) {
      this.$http.get('http://127.0.0.1:5001/api/redis/set?cmd=' + cmd)
        .then((result) => {
          console.log(result.data)
          this.queryResult = JSON.stringify(result.data, null, 2)
        }).catch((err) => {
          console.log(err) 
        });
    }
  }
}
</script>

<style lang="less" scoped>
.wedis-path {
  margin: 20px;
}

.wedis-result {
  padding: 15px 20px 10px 20px;
  display: block;
  width: auto;
}

</style>
