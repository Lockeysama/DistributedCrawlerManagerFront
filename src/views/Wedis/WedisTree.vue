<template>
  <div>
    <el-input class="tree-filter"
      placeholder="Filter"
      v-model="filterText" size="small">
    </el-input>
    <el-tree
      :filter-node-method="filterNode"
      :load="loadNode"
      :props="props"
      @node-click="nodeClick"
      node-key="id"
      lazy
      ref="tree">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>
          {{ node.label }}
          <p v-show="data.count" class="counter">{{ data.count }}</p>
        </span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click.stop="() => remove(node, data)">
            <i class="el-icon-remove remove-btn"></i>
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
let id = 1000;

export default {
  data() {
    return {
      props: {
        label: 'node',
        children: 'childrens',
        isLeaf: 'leaf'
      },
      filterText: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.$http.get('/api/redis/next_path_query?prefix=tddc')
          .then((result) => {
            console.log(result.data)
            return resolve(result.data);
          }).catch((err) => {
            console.log(err)  
            return resolve([])
          });
        return resolve([])
      }
      console.log(node.node)
      this.$http.get('/api/redis/next_path_query?prefix=' + node.data.path)
        .then((result) => {
          console.log(result.data)
          return resolve(result.data);
        }).catch((err) => {
          console.log(err) 
          return resolve([])
        });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.node.indexOf(value) !== -1;
    },
    remove(node, data) {
      const suffix = !node.data.leaf ? ":*" : ""
      this.$confirm("This option will remove key pattern \"" + data.path + suffix + "\"!", 'Tips', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Remove Success!'
          });
          const parent = node.parent;
          const children = parent.childNodes || parent.data;
          const index = children.findIndex(d => d.data.$treeNodeId === data.$treeNodeId);
          children.splice(index, 1);
          const cmd = !node.data.leaf ? "clean " : "del "
          this.$emit("cmdClick", cmd  + data.path + suffix)
        }).catch(() => {
          
        });
    },
    nodeClick(data, node) {
      if (data.leaf) {
        console.log(data, node)
        this.$emit("nodeClick", data.path)
      }
    }
  }
}

</script>

<style lang="less" scoped>
.tree-filter {
  padding: 5px 10px 10px 5px;
  display: block;
  width: auto;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;

  .item {
    margin-top: 0;
    margin-right: 0;
  }

  .counter {
    border: 1px solid #dcdfe6;
    border-radius: 10px;
    display: inline-block; 
    margin-left: 20px;
    background-color: #c0c7c2;
    font-size: 8px;
    -webkit-transform: scale(0.75); 
    -o-transform: scale(1);
    color: white;
    width: 40px;
  }

  .plus-btn {
    color: #41b883;
  }

  .remove-btn {
    color: #fc5555;
  }
}
</style>
