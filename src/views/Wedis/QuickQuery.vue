<template>
  <div class="quick-query">
    <el-button plain round type="primary" 
      v-for="item in quick_list" :key="item.name" 
      size="mini" @click="select(item)">
      {{ item.name }}
    </el-button>
    <el-button type="success" icon="el-icon-plus" circle size="mini" @click="dialogFormVisible=true"></el-button>
    <el-button type="danger" icon="el-icon-minus" circle size="mini" @click="remove"></el-button>
    <el-dialog title="Add Quick Query Tag" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Tag Name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="CMD" :label-width="formLabelWidth">
          <el-input v-model="form.cmd" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submit">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quick_list: [],
      curItem: null,
      dialogFormVisible: false,
      form: {
        name: '',
        cmd: ''
      },
      formLabelWidth: '120px'
    }
  },
  mounted() {
    this.$http.get('http://127.0.0.1:5001/api/redis/query?key=tddc:manager:weids:quick')
      .then((result) => {
        console.log(result.data)
        for (let key in result.data.result) {
          this.quick_list.push({name: key, cmd: result.data.result[key].replace("<>", " ")})
        }
      }).catch((err) => {
        console.log(err) 
      });
  },
  methods: {
    select(item) {
      this.curItem = item
      this.$emit("cmdClick", item.cmd)
    },
    submit() {
      this.dialogFormVisible = false
      const item = {name: this.form.name, cmd: this.form.cmd}
      this.quick_list.push()
      this.form.name = ''
      this.form.cmd = ''
      this.$emit("cmdClick", "hset tddc:manager:weids:quick " + item.name + " " + item.cmd.replace(" ", "<>"))
      console.log(JSON.stringify(item))
    },
    remove() {
      const index = this.quick_list.indexOf(this.curItem);
      if (index >= 0) this.quick_list.splice(index, 1);
      this.$emit("cmdClick", "hdel tddc:manager:weids:quick " + this.curItem.name);
      this.curItem = null
    }
  }
}
</script>

<style lang="less" scoped>
.quick-query {
  margin: 15px 20px 0px 20px;
  text-align: left;
}
</style>
