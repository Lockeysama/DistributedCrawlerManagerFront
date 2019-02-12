<template>
  <div>
    <el-tabs class="config-form" type="border-card">
      <el-tab-pane :label="key" v-for="(setting, key) in selectItem" :key="key">
        <el-form :inline="true" :model="setting"
          v-for="(items, ckey) in setting" :key="key+ckey+randomNum(1, 1000)">
          <div class="settings-form-container">
            <el-row v-for="(value, cckey) in items" :key="key+ckey+cckey+randomNum(1000, 2000)">
              <el-col :span="19" class="config-input">
                <el-input placeholder="Key" v-model="items[cckey]" size="small"> 
                  <template slot="prepend">{{ cckey }}</template>
                </el-input>
              </el-col>
              <el-col :span="3">
                <el-form-item size="small" class="config-update">
                  <el-button type="primary" @click="onSubmit">Submit</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item size="small">
                  <el-button type="danger" @click="onRemove">Remove</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="add-config">
              <el-col :span="10" class="config-input">
                <el-input placeholder="Key" v-model="input.key" size="small"></el-input>
              </el-col>
              <el-col :span="12" class="config-input">
                <el-input placeholder="value" v-model="input.value" size="small"></el-input>
              </el-col>
              <el-col :span="2" class="config-input">
                <el-button type="success" @click="onAdd" size="small">Add</el-button>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>  
  </div>
</template>

<script>
export default {
  props: {
    selectItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      formInline: {
        keys: [],
        values: []
      },
      input: {
        key: "",
        value: ""
      }
    }
  },
  methods: {
    onSubmit() {

    },
    onAdd() {

    },
    onRemove() {
      
    },
    randomNum(minNum,maxNum) { 
      switch(arguments.length){ 
        case 1: 
          return parseInt(Math.random()*minNum+1,10); 
        case 2: 
          return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        default: 
          return 0;
      }
    } 
  }
}
</script>

<style lang="less" scoped>
.config-form {
  text-align: left;

  .settings-form-container {
    padding: 15px 10px 0px 10px;
    border: 1px solid #dcdfe6;
    box-shadow: 2px 2px 2px #dcdfe6;
    margin-bottom: 10px;
    
    .add-config {
      margin-bottom: 15px;
    }
  }

  .config-input {
    padding: 0px 20px 0px 0px;
  }

}
</style>
