<template>
  <div>
    <el-row style="margin: 15px">
      <el-col :span="5">
        <div>
          <el-popover
            placement="right"
            width="100%"
            trigger="click">
            <el-upload
              class="upload-demo"
              drag
              :action="url"
              multiple
              list-type="text"
              :before-upload="beforeAvatarUpload"
              :on-success="onSuccess"
              :headers="{Authorization: this.$store.state.token}">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">Drag files on there, or click <em>Upload</em>.</div>
              <div class="el-upload__tip" slot="tip">Upload avatar file can only be "py" format.</div>
            </el-upload>
            <el-button slot="reference" type="success" size="small">Upload</el-button>
          </el-popover>
        </div>
      </el-col>
      <el-col :span="19" style="margin-top: 10px">
        <p></p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    platform: {
      type: String,
      default: ""
    }
  },
  date() {
    return {

    }
  },
  computed: {
    url() {
      return "/api/modules/upload?platform=" + this.platform
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      const isPy = file.type === 'text/x-python-script';
      if (!isPy) {
        this.$message.error('Upload avatar file can only be "py" format!');
      }
      return isPy
    },
    onSuccess() {
      console.log('Upload Success!')
      this.$emit("uploadSuccess")
    }
  }
}
</script>

<style lang="less" scoped>

</style>
