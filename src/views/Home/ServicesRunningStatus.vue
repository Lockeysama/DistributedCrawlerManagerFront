<template>
  <div id="running-status">
    <div id="simple-info">
      <p><span style="font-weight:bold">Total: </span><span>4</span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span style="font-weight:bold">Running: </span><span style="color: green">3</span></p>
    </div>
    <div id="server-list">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="Status" width="80">
          <template slot-scope="scope">
            <i :class="scope.row.running ? 'el-icon-success' : 'el-icon-error'"></i>
          </template>
        </el-table-column>
        <el-table-column label="Name" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Services" width="280">
          <template slot-scope="scope">
            <el-tag size="mini" style="margin: 3px"
              v-for="server in scope.row.services" :key="server">
              {{ server }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Host" width="480">
          <template slot-scope="scope">
            <span>{{ scope.row.host }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Date" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
          date: '2016-05-04 13:14:52',
          name: 'dc1',
          services: ['Crawler', 'Parser', 'Proxies'],
          host: 'public-1.cluster-cvt1rggskuer.ap-northeast-1.rds.amazonaws.com',
          running: true
        }, {
          date: '2016-05-04 13:14:52',
          name: 'dc2',
          services: ['Crawler', 'Parser'],
          host: 'public-1.cluster-cvt1rggskuer.ap-northeast-1.rds.amazonaws.com',
          running: true,
        }, {
          date: '2016-05-04 13:14:52',
          name: 'dc3',
          services: ['Crawler', 'Parser', 'WSCrawler', 'Manager', 'KLineAgg'],
          host: 'public-1.cluster-cvt1rggskuer.ap-northeast-1.rds.amazonaws.com',
          running: false
        }, {
          date: '2016-05-04 13:14:52',
          name: 'dc4',
          services: ['Crawler', 'Parser'],
          host: 'public-1.cluster-cvt1rggskuer.ap-northeast-1.rds.amazonaws.com',
          running: true
        }]
      }
  }
}
</script>

<style lang="less" scoped>
#simple-info {
  p {
    text-align: left;
  }
}

.el-icon-error {
  color: #fc5555;
}

.el-icon-success {
  color: #41b883;
}
</style>
