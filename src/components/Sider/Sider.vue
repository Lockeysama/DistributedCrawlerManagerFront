<template>
  <div>
    <el-menu default-active="1-3-1" 
      class="el-menu-vertical-demo" 
      @open="handleOpen" 
      @close="handleClose"
      @select="select">
      <el-submenu 
        class="td-side-submenu"
        v-for="(item, key) in items" :key="key"
        :index="key">
        <template slot="title">
          <span slot="title" style="font-weight:bold; font-size: 16px">{{ key }}</span>
        </template>
        <p v-if="layout === 3">
          <el-submenu
            v-for="(node, nkey) in item" :key="nkey+randomNum(1, 1000)"
            :index="nkey">
            <template slot="title">
              <span slot="title" style="font-size: 14px">{{ nkey }}</span>
            </template>
            <el-menu-item style="color: gray; font-size: 10px; font-style: italic"
              v-for="cnode in node" :key="cnode+randomNum(1000, 2000)"
              :index="cnode">{{ cnode }}
            </el-menu-item>
          </el-submenu>
        </p>
        <p v-else>
          <el-menu-item 
              v-for="(node, nkey) in item" :key="nkey"
              :index="nkey">{{ nkey }}
            </el-menu-item>
        </p>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    layout: {
      type: Number,
      default: 2
    },
    items: {
      type: Object,
      default() {return {}}
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    select(index, indexPath) {
      console.log(index, indexPath)
      this.$emit("siderSelect", indexPath)
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

</style>
