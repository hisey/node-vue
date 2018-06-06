<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="等级" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.level}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="210" align="center">
        <template slot-scope="scope">
          {{scope.row.create_time}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="是否上架" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.shelf | statusFilter">{{scope.row.shelf | statusToStr}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { goodsCategory } from "@/api/goods";

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      showCount: 10
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
    this.fetchData(1);
  },
  methods: {
    async fetchData(curentPage) {
      this.listLoading = true;
      let data = await goodsCategory({ curentPage, showCount: this.showCount });
      data = data.data;
      this.list = data.arr;
      this.listLoading = false;
    }
  }
};
</script>
