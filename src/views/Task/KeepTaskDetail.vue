<template>
  <div>
    <el-table v-show="!editMode"
      :data="tasks.data" style="width: 100%" class="modules-list">
      <el-table-column label="Status" width="80px" text-align="center">
        <template slot-scope="scope">
          <i
            :class="scope.row.b_valid === true ?
             'el-icon-success' : (scope.row.b_valid === false ?
              'el-icon-error' : 'el-icon-warning')"></i>
        </template>
      </el-table-column>
      <el-table-column label="Owner" width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.s_owner }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Platform" width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.s_platform }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Feature" width="140px">
        <template slot-scope="scope">
          <span>{{ scope.row.s_feature }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Proxy" width="140px">
        <template slot-scope="scope">
          <span>{{ scope.row.s_proxy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Date" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.i_timestamp | moment("YYYY-MM-DD hh:mm:ss") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">Edit</el-button>
          <el-button @click="remove(scope.row)" type="text" size="small" class="module-remove">Remove</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="editMode" v-if="editTarget" class="edit">
      <keep-task-editor :task="editTarget" @editDone="editDone"></keep-task-editor>
    </div>
  </div>
</template>

<script>
import KeepTaskEditor from './KeepTaskEditor.vue'

export default {
  components: {
    KeepTaskEditor
  },
  props: {
    tasks: {
      type: Object,
      default() {return {}}
    },
    platform: {
      type: String,
      default: ""
    },
    editMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editTarget: {s_source: ""}
    }
  },
  methods: {
    editDone() {
      this.$emit("edit", false)
    },
    edit(row) {
      console.log(row)
      this.editTarget = row
      this.$emit("edit", true)
    },
    submitEdit() {
      
    },
    cancelEdit() {
      this.$emit("edit", false)
    },
    remove(row) {
      console.log(row)
      this.$confirm('This will permanently delete the task, whether or not to continue?', 'Tips', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$http.get("http://127.0.0.1:5001/api/task_pad/delete?owner=" + row.s_owner + "&feature=" + row.s_feature)
            .then((result) => {
              console.log(result.data)
              let index = this.tasks.data.indexOf(row)
              this.tasks.data.splice(index, 1)
              this.$message({
                type: 'success',
                message: 'Remove Success!'
              });
            }).catch((err) => {
              console.log(err) 
            });
        }).catch(() => {

        });
    }
  }
}
</script>

<style lang="less" scoped>
.modules-list {
  padding: 0px 20px 20px 20px;
  margin-top: 5px;

  .el-icon-warning {
    color: #f9cc9d;
  }

  .module-remove {
    color: red;
  }
}

.edit {
  display: inline;
}
</style>
