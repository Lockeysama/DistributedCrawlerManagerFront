<template>
  <div>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <img class="header-logo" height="60" width="60" src="../../assets/virus.png" alt="">
        </div>
      </el-col>
      <el-col :span="19">
        <div class="grid-content bg-purple-light">
          <el-container>
            <el-header><t-d-header></t-d-header></el-header>
          </el-container>
        </div>
      </el-col>
      <el-col :span="3">
        <el-button 
          type="text" 
          v-show="this.$store.getters.isLoggedIn"
          @click="logout">
          Logout
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TDHeader from './TDHeader.vue'

export default {
  name: 'app',
  components: {
    TDHeader
  },
  methods: {
    logout() {
      this.$store.dispatch('Logout')
        .then(() => {
          this.$router.push({path: '/Login'});
        })
        .catch((error) => {
          console.log(error.response); 
        });
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  .el-container {
    .el-container {
      .el-main {
        min-height: 700px;
        padding: 5px 20px 5px 5px;
      }
    }
  }
}
</style>
