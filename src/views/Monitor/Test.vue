<template>
  <div>
    <el-tabs type="border-card" v-model="editableTabsValue2" >
      <el-tab-pane :label="key" v-for="(setting, key) in form" :key="key" :name="key">
        <el-form :inline="true" :model="setting"
          v-for="(items, ckey) in setting" :key="ckey">
          <h3>{{ ckey }}</h3>
          <div v-for="(item, cckey) in items" :key="cckey">
            <el-input placeholder="Key" v-model="items[cckey]" size="small"> 
              <template slot="prepend">{{ cckey }}</template>
            </el-input>  
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editableTabsValue2: "test",
      form: {
      }
    };
  },
  methods: {
    initForm(data) {
      this.form = data
    }
  }
}
</script>

<style lang="less" scoped>

</style>
