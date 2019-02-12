<template>
  <div class="input-command">
    <el-input label=">" placeholder="Input Command" size="small" v-model="cmd">
      <el-button slot="append" icon="el-icon-view" @click="click"></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cmd: ''
    }
  },
  methods: {
    click() {
      this.$emit("cmdClick", this.cmd)
    }
  }
}
</script>

<style lang="less" scoped>
.input-command {
  margin: 5px 20px 0px 20px;
}
</style>
