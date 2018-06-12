<template>
  <div class="app-container">
    <div class="clearfix">
      <el-button size="small" type="primary" style="float:right" @click='enterAddGoods()'>
        新增商品
      </el-button>
    </div>
    <el-table style="margin-top:15px;" :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="图片" width="210" align="center">
        <template slot-scope="scope">
          <img style="width:100%" :src="picUrl+scope.row.cover" alt="">
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="商品分类" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.category_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.price}}元
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="210" align="center">
        <template slot-scope="scope">
          {{scope.row.create_time}}
        </template>
      </el-table-column>
      <el-table-column label="商品状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag size="mini" :type="scope.row.shelf | shelfTagFilter">{{scope.row.shelf | shelfTextFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="商品属性" width="210" align="center">
        <template slot-scope="scope">
          <el-tag style="margin:0 5px;" v-for="(item, index) in scope.row.onsale.split(',')" :key="index" size="mini" :type="item | onsaleTagFilter">{{item | onsaleTextFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="310" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click='enterAddGoods(scope.row.id)'>编辑</el-button>
          <el-button size="mini" v-if="scope.row.shelf==0" @click="shelf(scope.row.id,1,scope.row.category_id)">上架</el-button>
          <el-button size="mini" type="warning" v-if="scope.row.shelf==1" @click="shelf(scope.row.id,0,scope.row.category_id)">下架</el-button>
          <el-button size="mini" type="danger" @click="handDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top:20px;" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="showCount" layout="total, prev, pager, next,jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { getGoodsList, shelfGoods, delGoods } from "@/api/goods";
import urls from "@/utils/env";
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      showCount: 10,
      total: 1,
      currentPage: 1,
      picUrl: urls.basicUrl,
    };
  },
  filters: {
    shelfTagFilter(status) {
      const statusMap = {
        0: "info",
        1: "success"
      };
      return statusMap[status];
    },
    shelfTextFilter(status) {
      const statusMap = {
        1: "上架",
        0: "下架"
      };
      return statusMap[status];
    },
    onsaleTagFilter(status) {
      const statusMap = {
        1: "",
        2: "success",
        3: "warning",
        4: "danger"
      };
      return statusMap[status];
    },
    onsaleTextFilter(status) {
      const statusMap = {
        1: "推荐",
        2: "优选",
        3: "折扣",
        4: "热门"
      };
      return statusMap[status];
    }
  },
  created() {
    this.fetchData("1");
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    async fetchData() {
      this.listLoading = true;
      let data = await getGoodsList({
        curentPage: this.currentPage,
        showCount: this.showCount
      });
      data = data.data;
      this.list = data.arr;
      this.listLoading = false;
      this.total = data.totalCount;
      this.pageSize = data.totalPages;
    },
    async shelf(id, shelf, category_id) {
      let data = await shelfGoods({
        id,
        shelf,
        category_id
      });
      if (data.code == 200) {
        this.$message({
          message: data.msg,
          type: "success",
          onClose: () => {
            this.fetchData();
          }
        });
      }
    },
    async handDelete(id) {
      let data = await delGoods({
        id
      });
      if (data.code == 200) {
        this.$message({
          message: data.msg,
          type: "success",
          onClose: () => {
            this.fetchData();
          }
        });
      }
    },
    enterAddGoods(id) {
      // console.log(this);
      
      if (id) {
        this.$router.push({ path: "/goodsManage/editGoods", query: { id } })
      } else {
        this.$router.push({ path: "/goodsManage/addGoods" })
      }
    }
  }
};
</script>
