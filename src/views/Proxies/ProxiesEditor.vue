<template>
  <div>
    <el-form 
      :model="task" 
      :rules="rules" 
      ref="task" 
      label-width="100px" 
      class="task-rule-form">
      <el-form-item label="ID" size="small">
        <el-input v-model="task.s_id" disabled></el-input>
      </el-form-item>
      <el-form-item label="Platform" prop="s_platform" size="small" required>
        <el-input v-model="task.s_platform"></el-input>
      </el-form-item>
      <el-form-item label="Feature" prop="s_feature" size="small" required>
        <el-input v-model="task.s_feature"></el-input>
      </el-form-item>
      <el-form-item label="URL" prop="s_url" size="small" required>
        <el-input v-model="task.s_url"></el-input>
      </el-form-item>
      <el-form-item label="Method" size="small">
        <el-select v-model="task.s_method" style="display: block">
          <el-option label="GET" value="GET"></el-option>
          <el-option label="POST" value="POST"></el-option>
          <el-option label="HEAD" value="HEAD"></el-option>
          <el-option label="PUT" value="PUT"></el-option>
          <el-option label="DELETE" value="DELETE"></el-option>
          <el-option label="CONNECT" value="CONNECT"></el-option>
          <el-option label="OPTIONS" value="OPTIONS"></el-option>
          <el-option label="TRACE" value="TRACE"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Proxy Type" size="small">
        <el-select v-model="task.s_proxy" style="display: block">
          <el-option label="None" value="None"></el-option>
          <el-option label="HTTP" value="HTTP"></el-option>
          <el-option label="HTTPS" value="HTTPS"></el-option>
          <el-option label="Other" value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Proxies" size="small" v-show="!task.s_proxy">
        <el-input v-model="task.s_proxy"></el-input>
      </el-form-item>
      <el-form-item label="Headers" size="small">
        <el-input v-model="task.s_headers"></el-input>
      </el-form-item>
      <el-form-item label="Data" size="small">
        <el-input v-model="task.s_data"></el-input>
      </el-form-item>
      <el-form-item label="JSON" size="small">
        <el-input v-model="task.s_json"></el-input>
      </el-form-item>
      <el-form-item label="Params" size="small">
        <el-input v-model="task.s_params"></el-input>
      </el-form-item>
      <el-form-item label="Cookies" size="small">
        <el-input v-model="task.s_cookies"></el-input>
      </el-form-item>
      <el-form-item label="Valid" class="task-timer" size="small">
        <el-switch v-model="task.b_valid"></el-switch>
      </el-form-item>
      <el-form-item label="Desc" size="small">
        <el-input type="textarea" v-model="task.s_desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('task')" size="small">Submit</el-button>
        <el-button @click="resetForm('task')" size="small">Reset</el-button>
        <el-button @click="removeTask(task)" size="small" type="danger">Remove</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      default() { 
        return {
          s_id: "-1", s_platform: "", s_feature: "", s_url: "",
          s_method: "GET", s_proxy: "HTTP", s_headers: "", 
          s_data: "", s_cookies: "", s_json: "", s_params: "", 
          b_valid: true, s_desc: "", i_timeout: 10
        } 
      }
    }
  },
  data() {
    return {
      rules: {
          s_platform: [
            { required: true, message: 'Please input platform', trigger: 'blur' },
            { min: 1, max: 32, message: 'Length from 1 to 32 characters', trigger: 'blur' }
          ],
          s_feature: [
            { required: true, message: 'Please input feature', trigger: 'blur' },
            { min: 1, max: 64, message: 'Length from 1 to 64 characters', trigger: 'blur' }
          ],
          s_url: [
            { required: true, message: 'Please input URL', trigger: 'blur' },
            { min: 10, message: 'Please enter a valid URL address', trigger: 'blur' }
          ]
        }
    }
  },
  methods: {
    submitForm(task) {
      this.$refs["task"].validate((valid) => {
        if (valid) {
          this.$http.post('/api/proxies/edit', this.task)
            .then(resp => {
              console.log(resp.data)
              this.$message({
                message: 'Edit Success.',
                type: 'success'
              });
              this.$emit("editSuccess")
            })
            .catch(err => {
              console.log(err)
              this.$message({
                message: 'Edit Failed.',
                type: 'warning'
              });
            })
        } else {
          console.log('error submit!!');
          this.$message({
            message: 'Submit Failed. Please check the submission.',
            type: 'warning'
          });
          return false;
        }
      });
    },
    resetForm() {
      let default_setting = {
        s_id: "-1", s_platform: "", s_feature: "", s_url: "",
        s_method: "GET", s_proxy: "HTTP", s_headers: "", 
        s_data: "", s_cookies: "", s_json: "", s_params: "", 
        b_valid: true, s_desc: "", i_timeout: 10
      }
      for (let key in default_setting) {
        this.task[key] = default_setting[key]
      }
      this.$message({
        message: 'Reset Success.',
        type: 'success'
      });
    },
    removeTask(task) {
      console.log(task)
      this.$confirm(
        'This will permanently delete this proxies task, whether or not to continue?', 
        'Tips', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$http.get('/api/proxies/delete?feature=' + this.task.s_feature)
            .then(resp => {
              console.log(resp.data)
              this.$message({
                message: 'Remove Success.',
                type: 'success'
              });
              this.$emit("removeTask", this.task)
              this.$emit("removeSuccess")
            })
            .catch(err => {
              console.log(err)
              this.$message({
                message: 'Remove Failed.',
                type: 'warning'
              });
            })
        }).catch(() => {
            
        });
    }
  }
}
</script>

<style lang="less" scoped>
.task-rule-form {
  padding-right: 20px;

  label {
    font-weight: bold;
  }
}

.task-timer {
  text-align: left;
}
</style>
