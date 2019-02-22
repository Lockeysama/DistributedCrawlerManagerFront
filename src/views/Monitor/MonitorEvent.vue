<template>
  <div id="configuration-container">
    <h1>Monitor Event</h1>
    <el-button @click="parent">click</el-button>
    <test ref="child"></test>
  </div>
</template>

<script>
import Test from './Test.vue'

export default {
  methods: {
    parent() {
      this.form = {
        test: {
          default: {
            passwd: "12",
            confirm: "123123",
            age: 12
          }
        }
      }
      this.$refs.child.initForm(this.form)
    }
  },
  data() {
    return {
      form: {
      }
    }
  },
  components: {
    Test
  }
}
</script>

<style lang="less" scoped>

</style>
