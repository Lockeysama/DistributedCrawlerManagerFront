<template>
  <div style="border: 1px solid #dcdfe6; box-shadow: 2px 2px 2px #dcdfe6;">
    <div style="padding: 20px">
      <el-table :data="dataList" style="width: 100%;" max-height="1200">
        <el-row>
          <el-col :span="4">
            <el-table-column fixed label="Date">
              <template slot-scope="scope">
                <span>{{ scope.row.i_date | moment("YYYY-MM-DD hh:mm:ss") }}</span>
              </template>
            </el-table-column>
          </el-col>
          <el-col :span="4">
            <el-table-column prop="s_name" label="Name"></el-table-column>
          </el-col>
          <el-col :span="4">
            <el-table-column prop="s_ip" label="IP"></el-table-column>
          </el-col>
          <el-col :span="4">
            <el-table-column prop="s_mac" label="MAC"></el-table-column>
          </el-col>
          <el-col :span="4">
            <el-table-column prop="s_desc" label="DESC"></el-table-column>
          </el-col>
          <el-col :span="4">
            <el-table-column fixed="right" label="Action">
              <template slot-scope="scope">
                <el-button
                  type="text" size="small"
                  @click.native.prevent="afterEdit(scope.$index, dataList)">
                  Edit
                </el-button>
                <el-button
                  class="btn-reject"
                  @click.native.prevent="deleteRow(scope.$index, dataList)"
                  type="text"
                  size="small">
                  Remove
                </el-button>
              </template>
            </el-table-column>
          </el-col>
        </el-row>
      </el-table>
    </div>
    <el-dialog title="Edit" :visible.sync="dialogFormVisible">
      <el-form :model="input">
        <el-form-item label="Name" :label-width="formLabelWidth">
          <el-input v-model="input.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Desc" :label-width="formLabelWidth">
          <el-input v-model="input.desc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Calcel</el-button>
        <el-button type="primary" @click="editRow">OK</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dataList: Array
  },
  methods: {
    afterEdit(index, rows) {
      this.currentRowIndex = index
      this.dialogFormVisible = true
    },
    editRow(el) {
      this.dialogFormVisible = false
      console.log(this.input)
      this.dataList[this.currentRowIndex]["s_name"] = this.input.name
      this.dataList[this.currentRowIndex]["s_desc"] = this.input.desc
      this.input.name = ""
      this.input.desc = ""
      this.$emit("editItem", this.currentRowIndex, this.dataList, (index, rows, success) => {
        if (success) {
          this.$message({
            type: 'success',
            message: 'Edit Item Success!'
          });
        } else {
          this.$message({
            type: 'warning',
            message: 'Remove Item Failed!'
          });
        }
      })
    },
    deleteRow(index, rows) {
      this.$confirm('This will permanently delete the item, whether to continue?', 'Tips', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$emit("removeItem", index, rows, (index, rows, success) => {
          if (success) {
            rows.splice(index, 1);
          } else {
            this.$message({
              type: 'warning',
              message: 'Remove Item Failed!'
            });
          }
        })
      }).catch(() => {
        
      });
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '80px',
      currentRowIndex: null,
      input: {
        name: "",
        desc: ""
      }
    }
  }
}
</script>

<style lang="less" scoped>
.btn-pass {
  color: #68c23a;
}

.btn-reject {
  color: #ee3131;
}
</style>
