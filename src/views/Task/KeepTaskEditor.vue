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
      <el-form-item label="Owner" prop="s_owner" size="small" required>
        <el-input v-model="task.s_owner"></el-input>
      </el-form-item>
      <el-form-item label="Platform" prop="s_platform" size="small" required>
        <el-input v-model="task.s_platform"></el-input>
      </el-form-item>
      <el-form-item label="Feature" prop="s_feature" size="small" required>
        <el-input v-model="task.s_feature"></el-input>
      </el-form-item>
      <el-form-item label="Proxy" prop="s_proxy" size="small">
        <el-input v-model="task.s_proxy"></el-input>
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
        <el-button @click="cancel" size="small" >Cancel</el-button>
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
          s_id: "-1", s_platform: "", s_feature: "", s_owner: "",
          s_proxy: "", i_timestamp: 1, s_desc: "", b_valid: false
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
          s_owner: [
            { required: true, message: 'Please input owner', trigger: 'blur' },
            { min: 1, message: 'Please enter a valid URL address', trigger: 'blur' }
          ]
        }
    }
  },
  methods: {
    submitForm(task) {
      this.$refs["task"].validate((valid) => {
        if (valid) {
          this.$http.post('/api/task_pad/edit', this.task)
            .then(resp => {
              this.$emit("editDone")
              console.log(resp.data)
              this.$message({
                message: 'Edit Success.',
                type: 'success'
              });
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
        s_id: "-1", s_platform: "", s_feature: "", s_owner: "",
        s_proxy: "", i_timestamp: 1, s_desc: "", b_valid: false
      } 
      for (let key in default_setting) {
        this.task[key] = default_setting[key]
      }
      this.$message({
        message: 'Reset Success.',
        type: 'success'
      });
    },
    cancel() {
      this.$emit("editDone")
      this.$message({
        type: 'success',
        message: 'Edit Cancel!'
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
