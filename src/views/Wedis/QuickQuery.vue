<template>
  <div class="quick-query">
    <div class="itemBtn" v-for="item in quick_list" :key="item.name">
      <i class="itemEdit el-icon-edit" @click="editItem(item)"></i>
      <el-button plain round type="primary" 
        size="mini" @click="select(item)">
        {{ item.name }}
      </el-button>
      <i class="itemRemove el-icon-delete" @click="removeItem(item)"></i>
    </div>
    <el-button type="success" icon="el-icon-plus" circle size="mini" @click="dialogFormVisible=true"></el-button>

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
    this.$http.get('/api/redis/query?key=tddc:manager:weids:quick')
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
      let item = this.quick_list.find((x)=> {
        return x.name === this.form.name
      })
      if (item) {
        item.name = this.form.name
        item.cmd = this.form.cmd
      } else {
        item = {name: this.form.name, cmd: this.form.cmd}
        this.quick_list.push(item)
      }
      this.form.name = ''
      this.form.cmd = ''
      this.$emit("cmdClick", "hset tddc:manager:weids:quick " + item.name + " " + item.cmd.replace(" ", "<>"))
      console.log(JSON.stringify(item))
    },
    removeItem(item) {
      this.$confirm("This option will remove the tag!", 'Tips', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          const index = this.quick_list.indexOf(item);
          if (index >= 0) this.quick_list.splice(index, 1);
          this.$emit("cmdClick", "hdel tddc:manager:weids:quick " + item.name);
          this.$message({
            type: 'success',
            message: 'Remove Success!'
          });
        }).catch(() => {
          
        });
    },
    editItem(item) {
      this.form.name = item.name
      this.form.cmd = item.cmd
      this.dialogFormVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.quick-query {
  margin: 15px 20px 0px 20px;
  text-align: left;

  .itemBtn {
    display: inline; 
    margin: 5px;
    background: #eaf5ff;
    border: 1px solid #b3d8ff;
    border-radius: 20px;
    font-size: 12px;

    .itemEdit {
      margin-left: 5px;
      color: #a57f34;
    }

    .itemRemove {
      margin-right: 5px;
      color: #ee3e3e;
    }
  }
}
</style>
