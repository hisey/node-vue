<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="商品分类" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.category}}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.price}}元
        </template>
      </el-table-column>
      <el-table-column label="图片" width="110" align="center">
        <template slot-scope="scope">
           <img :src="scope.row.imgs" alt="">
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.create_time}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="是否上架" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.inventory | statusFilter">{{scope.row.inventory | statusToStr}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="是否热推" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.onsale | statusFilter">{{scope.row.onsale | statusToStr}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getGoodsList } from '@/api/goods'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    };
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: "success",
        0: "gray"
      };
      return statusMap[status];
    },
    statusToStr(status) {
      const statusMap = {
        1: "是",
        0: "否"
      };
      return statusMap[status];
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      // console.log("sadf");
      
      this.listLoading = true;
      let data=await getGoodsList()
      // getList(this.listQuery).then(response => {
        this.list = data.goods
        this.listLoading = false
      // })
    }
  }
};
</script>
