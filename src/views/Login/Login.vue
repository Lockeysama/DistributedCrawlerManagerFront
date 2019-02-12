<template>
  <div class="login-tmp">
    <div>
      <img src="../../assets/virus.png" alt="" style="z-index: 9999; position: relative">
    </div>
    <el-row>
      <el-col :span="8"><p></p></el-col>
      <el-col :span="8">
        <el-form 
          :model="login_form" 
          status-icon 
          ref="login_form"
          class="login-form">
          <el-form-item label="UserName" prop="pass">
            <el-input autocomplete="off" v-model="login_form.user_name"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="checkPass">
            <el-input type="password" v-model="login_form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit" >Login</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login_form: {
        user_name: "",
        password: ""
      }
    }
  },
  methods: {
    submit() {
      let params = {
        'username': this.login_form.user_name,
        'password': this.login_form.password
      };
      this.$store.dispatch('Login', params)
        .then(() => {
          this.$router.push(
            {path: this.$route.query.redirect ? this.$route.query.redirect : '/'}
          );
          console.log(this.$route.query.redirect)
        })
        .catch((error) => {
          console.log(error.response); 
        });
   }
  }
}
</script>

<style lang="less" scoped>
.login-tmp {
  position: relative;
}

.login-form {
  border: 1px solid #dcdfe6;
  box-shadow: 2px 2px 2px #dcdfe6;
  padding: 20px;
  margin-top: -40px;
}
</style>
