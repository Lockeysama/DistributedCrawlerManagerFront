<template>
  <div class="dc-cluster-running-status">
    <br>
    <div id="simple-info">
      <p><span style="font-weight:bold">Manager: 3</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
      <p><span style="font-weight:bold">Crawler: 8</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
      <p><span style="font-weight:bold">Parser: 6</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
      <p><span style="font-weight:bold">Proxies: 5</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
      <p><span style="font-weight:bold">WSCrawler: 9</span></p>
    </div>
    <br>
    <div id="cluster-list">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="Status" width="80">
          <template slot-scope="scope">
            <i :class="scope.row.running ? 'el-icon-success' : 'el-icon-error'"></i>
          </template>
        </el-table-column>
        <el-table-column label="Name" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Type" width="100">
          <template slot-scope="scope">
            <el-tag size="mini">{{ scope.row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Host" width="580">
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
          type: 'Crawler',
          name: 'c1',
          services: ['Crawler', 'Parser', 'Proxies'],
          host: 'public-1.cluster-cvt1rggskuer.ap-northeast-1.rds.amazonaws.com',
          running: true
        }, {
          date: '2016-05-04 13:14:52',
          type: 'Crawler',
          name: 'c2',
          services: ['Crawler', 'Parser'],
          host: 'public-1.cluster-cvt1rggskuer.ap-northeast-1.rds.amazonaws.com',
          running: true,
        }, {
          date: '2016-05-04 13:14:52',
          type: 'Parser',
          name: 'p1',
          services: ['Crawler', 'Parser', 'WSCrawler', 'Manager', 'KLineAgg'],
          host: 'public-1.cluster-cvt1rggskuer.ap-northeast-1.rds.amazonaws.com',
          running: false
        }, {
          date: '2016-05-04 13:14:52',
          type: 'Proxies',
          name: 'pc1',
          services: ['Crawler', 'Parser'],
          host: 'public-1.cluster-cvt1rggskuer.ap-northeast-1.rds.amazonaws.com',
          running: true
        }]
      }
  }
}
</script>

<style lang="less">
#simple-info {
  text-align: left;
  p {
    display: inline;
    font-size: 14px;
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
