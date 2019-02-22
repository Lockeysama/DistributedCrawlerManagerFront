<template>
  <div>
    <div style="margin: 20px;">
      <el-button
        size="small"
        type="success"
        @click="addTab(editableTabsValue2)">
        Add Tab
      </el-button>
    </div>
    <el-tabs
      v-model="editableTabsValue2" 
      class="config-form" type="border-card" 
      closable @tab-remove="removeTab">
      <el-tab-pane :label="key" v-for="(setting, key) in itemsDetail" :key="key" :name="key">
        <el-form :inline="true" :model="setting"
          v-for="(items, ckey) in setting" :key="ckey">
          <div class="settings-form-container">
            <h4 style="color: gray">Group Name: {{ ckey }}</h4>
            <el-row v-for="(value, cckey) in items" :key="cckey">
              <el-col :span="19" class="config-input">
                <el-input placeholder="Value" v-model="items[cckey]" size="small"> 
                  <template slot="prepend">{{ cckey }}</template>
                </el-input>  
              </el-col>
              <el-col :span="3">
                <el-form-item size="small" class="config-update">
                  <el-button type="primary" @click="onSubmit(items, cckey, ckey, key)">Submit</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item size="small">
                  <el-button type="danger" @click="onRemove(items, cckey, ckey, key)">Remove</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="add-config">
              <el-button type="success" @click="onAdd(items)" size="small">Add Config Item</el-button>
              <el-button type="primary" @click="onSubmitAll(setting, ckey, key)" size="small">Submit All</el-button>
              <el-button type="danger" @click="removeThisGroup(setting, ckey, key)" size="small">Remove This Group</el-button>
            </el-row>
          </div>
        </el-form>
        <el-button type="success" @click="onAddGroup(key, itemsDetail)" size="small">Add Config Group</el-button>
      </el-tab-pane>
    </el-tabs>  
    <el-dialog title="Add Config" :visible.sync="dialogFormVisible">
      <el-form :model="input">
        <el-form-item label="Key" :label-width="formLabelWidth">
          <el-input v-model="input.key" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Value" :label-width="formLabelWidth">
          <el-input v-model="input.value" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Calcel</el-button>
        <el-button type="primary" @click="afterAdd">OK</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemsDetail: {},
      dialogFormVisible: false,
      formLabelWidth: '80px',
      editableTabsValue2: "event",
      addCondigItems: {},
      input: {
        key: "",
        value: ""
      }
    }
  },
  methods: {
    initData(data) {
      this.itemsDetail = data
    },
    reflush() {
      const name = this.editableTabsValue2
      if (this.editableTabsValue2 === 'event') {
        this.editableTabsValue2 = Object.keys(this.itemsDetail)[2]
      } else {
        this.editableTabsValue2 = Object.keys(this.itemsDetail)[0]
      }
      this.editableTabsValue2 = name
    },
    addTab(targetName) {
      this.$prompt('Please Input New Tab Name', 'Tips', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
      }).then(({ value }) => {
        this.itemsDetail[value] = {'default': {'key': 'value'}}
        this.editableTabsValue2 = value
      }).catch(() => {
        
      });
    },
    onAddGroup(key, selectItem) {
      this.$prompt('Please Input New Group Name', 'Tips', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
      }).then(({ value }) => {
        let target = selectItem[key][Object.keys(selectItem[key])[0]]
        this.$set(selectItem[key], value, {})
        if (target) {
          for (let k in target) {
            this.$set(selectItem[key][value], k, target[k])
          }
        }
        this.reflush()
      }).catch(() => {
        
      });
    },
    removeThisGroup(setting, groupName, tabName) {
      this.$confirm('This will permanently delete the group, whether to continue?', 'Tips', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$emit("removeGroup", setting, groupName, tabName, (setting, groupName, success) => {
          if (success) {
            delete setting[groupName]
            this.reflush()
          } else {
            this.$message({
              type: 'warning',
              message: 'Remove Group Failed!'
            });
          }
        })
      }).catch(() => {
        
      });
    },
    removeTab(tabName) {
      this.$confirm('This will permanently delete the tab, whether to continue?', 'Tips', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$emit("removeTab", tabName, (tabName, success) => {
          if (success) {
            this.editableTabsValue2 = tabName
            delete this.itemsDetail[tabName]
            this.editableTabsValue2 = Object.keys(this.itemsDetail)[0]
          } else {
            this.$message({
              type: 'warning',
              message: 'Remove Tab Failed!'
            });
          }
        })
      }).catch(() => {
        
      });
    },
    onSubmit(item, cckey, ckey, key) {
      console.log(item, cckey, ckey, key)
      let config = {}
      config[key] = {}
      config[key][ckey] = {}
      config[key][ckey][cckey] = item[cckey]
      this.$emit("configModify", config)
    },
    onSubmitAll(setting, ckey, key) {
      let config = {}
      config[key] = {}
      config[key][ckey] = setting[ckey]
      this.$emit("configModify", config)
    },
    onRemove(item, itemName, groupName, tabName) {
      this.$confirm('This will permanently delete the item, whether to continue?', 'Tips', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$emit("removeItem", item, itemName, groupName, tabName, (item , itemName, success) => {
          if (success) {
            delete item[itemName]
            this.reflush()
          } else {
            this.$message({
              type: 'warning',
              message: 'Remove Tab Failed!'
            });
          }
        })
      }).catch(() => {
        
      });
    },
    onAdd(items) {
      this.addCondigItems = items
      this.dialogFormVisible = true
    },
    afterAdd() {
      this.dialogFormVisible = false
      this.addCondigItems[this.input.key] = this.input.value
      this.reflush()
      this.input.key = ""
      this.input.value = ""
      this.addCondigItems = {}
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
