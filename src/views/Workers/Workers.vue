<template>
  <div id="worker-container">
    <el-container>
      <el-main>
        <el-tabs type="border-card" @tab-click="handleClick">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-date"></i>Registration List</span>
            <register 
              :dataList="registrationList" 
              @pass="passRegistration" @reject="rejectRegistration">
            </register>
          </el-tab-pane>
          <el-tab-pane label="White List">
            <black-white-list
              :dataList="whiteList" @removeItem="removeFromWhiteList" @editItem="editFromWhiteList">
            </black-white-list>
          </el-tab-pane>
          <el-tab-pane label="Black List">
            <black-white-list
              :dataList="blackList" @removeItem="removeFromBlackList" @editItem="editFromBlackList">
            </black-white-list>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Register from './Register.vue'
import BlackWhiteList from './BlackWhiteList.vue'

export default {
  components: {
    Register, BlackWhiteList
  },
  mounted () {
    this.getRegistrationList()
  },
  data() {
    return {
      registrationList: [],
      whiteList: [],
      blackList: []
    }
  },
  methods: {
    getRegistrationList() {
      this.$http.get("/api/workers/registrationlist")
        .then((result) => {
          console.log(result)
          this.registrationList = result.data.data
        }).catch((err) => {
          console.log(err)

        });
    },
    getWhiteList() {
      this.$http.get("/api/workers/whitelist")
        .then((result) => {
          console.log(result)
          this.whiteList = result.data.data
        }).catch((err) => {
          console.log(err)

        });
    },
    getBlackList() {
      this.$http.get("/api/workers/blacklist")
        .then((result) => {
          console.log(result)
          this.blackList = result.data.data
        }).catch((err) => {
          console.log(err)

        });
    },
    handleClick(tab, event) {
      console.log(tab, event)
      if (tab.index == 0) {
        this.getRegistrationList()
      } else if (tab.index == 1) {
        this.getWhiteList()
      } else if (tab.index == 2) {
        this.getBlackList()
      } 
    },
    passRegistration(index, rows, cb) {
      const data = {
        isPass: true,
        worker: rows[index]
      }
      this.$http.post('/api/workers/auth', data)
        .then(resp => {
          console.log(resp)
          cb(index, rows, true)
        })
        .catch(err => {
          
        })
    },
    rejectRegistration(index, rows, cb) {
      const data = {
        isPass: false,
        worker: rows[index]
      }
      this.$http.post('/api/workers/auth', data)
        .then(resp => {
          console.log(resp)
          cb(index, rows, true)
        })
        .catch(err => {
          
        })
    },
    editFromWhiteList(index, rows, cb) {
      const data = {
        worker: rows[index]
      }
      this.$http.post('/api/workers/whitelist/edit', data)
        .then(resp => {
          console.log(resp)
          cb(index, rows, true)
        })
        .catch(err => {
          
        })
    },
    editFromBlackList(index, rows, cb) {
      const data = {
        worker: rows[index]
      }
      this.$http.post('/api/workers/blacklist/edit', data)
        .then(resp => {
          console.log(resp)
          cb(index, rows, true)
        })
        .catch(err => {
          
        })
    },
    removeFromWhiteList(index, rows, cb) {
      const data = {
        worker: rows[index]
      }
      this.$http.post('/api/workers/whitelist/remove', data)
        .then(resp => {
          console.log(resp)
          cb(index, rows, true)
        })
        .catch(err => {
          
        })
    },
    removeFromBlackList(index, rows, cb) {
      const data = {
        worker: rows[index]
      }
      this.$http.post('/api/workers/blacklist/remove', data)
        .then(resp => {
          console.log(resp)
          cb(index, rows, true)
        })
        .catch(err => {
          
        })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
