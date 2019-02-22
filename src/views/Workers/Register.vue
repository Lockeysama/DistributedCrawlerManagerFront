<template>
  <div style="border: 1px solid #dcdfe6; box-shadow: 2px 2px 2px #dcdfe6;">
    <div style="padding: 20px">
      <el-table :data="dataList" style="width: 100%;" max-height="1200">
        <el-row>
          <el-col :span="6">
            <el-table-column fixed label="Date">
              <template slot-scope="scope">
                <span>{{ scope.row.i_date | moment("YYYY-MM-DD hh:mm:ss") }}</span>
              </template>
            </el-table-column>
          </el-col>
          <el-col :span="6">
            <el-table-column prop="s_ip" label="IP"></el-table-column>    
          </el-col>
          <el-col :span="6">
            <el-table-column prop="s_mac" label="MAC"></el-table-column>    
          </el-col>
          <el-col :span="6">
            <el-table-column fixed="right" label="Action">
              <template slot-scope="scope">
                <el-button
                  class="btn-pass" type="text" size="small"
                  @click.native.prevent="pass(scope.$index, dataList)">
                  Pass
                </el-button>
                <el-button
                  class="btn-reject" type="text" size="small"
                  @click.native.prevent="reject(scope.$index, dataList)">
                  Reject
                </el-button>
              </template>
            </el-table-column>
          </el-col>
        </el-row>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataList: Array
  },
  methods: {
    pass(index, rows) {
      this.$confirm('This will permanently pass the registration, whether to continue?', 'Tips', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$emit("pass", index, rows, (index, rows, success) => {
          if (success) {
            rows.splice(index, 1);
          } else {
            this.$message({
              type: 'warning',
              message: 'Pass Failed!'
            });
          }
        })
      }).catch(() => {
        
      });
    },
    reject(index, rows) {
      this.$confirm('This will permanently reject the registration, whether to continue?', 'Tips', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$emit("reject", index, rows, (index, rows, success) => {
          if (success) {
            rows.splice(index, 1);
          } else {
            this.$message({
              type: 'warning',
              message: 'Reject Failed!'
            });
          }
        })
      }).catch(() => {
        
      });
    }
  },
  data() {
    return {
      
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
