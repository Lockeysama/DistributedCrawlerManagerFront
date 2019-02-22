<template>
  <div>
    <el-table v-show="!editorMode"
      :data="modules.data" style="width: 100%" class="modules-list">
      <el-table-column label="Status" width="80px" text-align="center">
        <template slot-scope="scope">
          <i
            :class="scope.row.b_valid === true ?
             'el-icon-success' : (scope.row.b_valid === false ?
              'el-icon-error' : 'el-icon-warning')"></i>
        </template>
      </el-table-column>
      <el-table-column label="Feature" width="140px">
        <template slot-scope="scope">
          <span>{{ scope.row.s_feature }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Package" width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.s_package }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Mould" width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.s_mould }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Version" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.s_version }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Date" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.i_timestamp | moment("YYYY-MM-DD hh:mm:ss") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Action"
        width="180">
        <template slot-scope="scope">
          <el-button @click="push(scope.row)" type="text" size="small">Push</el-button>
          <el-button @click="edit(scope.row)" type="text" size="small">Edit</el-button>
          <el-button @click="remove(scope.row)" type="text" size="small" class="module-remove">Remove</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="editorMode" v-if="editTarget" class="edit">
      <el-row style="margin-bottom: 15px">
        <el-col :span="2">
          <el-button size="small" type="primary" @click="submitEdit">Submit</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="small" @click="cancelEdit">Cancel</el-button>
        </el-col>
        <el-col :span="20"><p></p></el-col>
      </el-row>
      <aceeditor
        v-model="editTarget.s_source" @init="editorInit" 
        lang="html" theme="chrome" 
        width="100%" height="1500">
      </aceeditor>
    </div>
  </div>
</template>

<script>
import aceeditor from 'vue2-ace-editor'

export default {
  components: {
    aceeditor
  },
  props: {
    modules: {
      type: Object,
      default() {return {}}
    },
    platform: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      editorMode: false,
      editTarget: {s_source: ""}
    }
  },
  methods: {
    edit(row) {
      console.log(row)
      this.editTarget = row
      console.log(this.content)
      this.editorMode = true
    },
    push(row) {
      const data = {
        feature: row.s_feature,
        owner: this.platform
      }
      this.$http.post(
        "/api/modules/push", data
        )
        .then(resp => {
          this.$message({
            type: 'success',
            message: 'Push Success!'
          });
        })
        .catch(err => {
          
        })
    },
    bufToHex(buffer) {
      return Array.prototype.map.call(new Uint8Array(buffer), function (x) {
          return ('00' + x.toString(16)).slice(-2)
      }).join('')
    },
    submitEdit() {
      let param = new FormData();
      let _file = new File(
        [this.editTarget.s_source], 
        this.editTarget.s_package + ".py", 
        {type: "text/x-python-script"}
      )
      param.append('file', _file);
      let config = {
        headers:{'Content-Type': 'multipart/form-data'}
      }; 
      this.$http.post(
        "/api/modules/upload?platform=" + this.platform, param, config
        )
        .then(resp => {
          this.$message({
            type: 'success',
            message: 'Upload Success!'
          });
        })
        .catch(err => {
          
        })
    },
    cancelEdit() {
      this.editTarget = {s_source: ""}
      this.editorMode = false
    },
    remove(row) {
      console.log(row)
      this.$confirm('This will permanently delete the module, whether or not to continue?', 'Tips', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          let cmd = "del tddc:worker:config:common:extra_modules:" + this.platform + ":" + row.s_feature
          this.$http.get('/api/redis/set?cmd=' + cmd)
            .then((result) => {
              console.log(result.data)
              let index = this.modules.data.indexOf(row)
              this.modules.data.splice(index, 1)
              this.$message({
                type: 'success',
                message: 'Remove Success!'
              });
              this.$emit("removeModuleSuccess")
            }).catch((err) => {
              console.log(err) 
            });
        }).catch(() => {

        });
    },
    editorInit: function () {
      require('brace/ext/language_tools')
      require('brace/mode/html')                
      require('brace/mode/javascript')
      require('brace/mode/less')
      require('brace/theme/chrome')
      require('brace/snippets/javascript')
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
