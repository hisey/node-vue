<template>
  <div class="app-container">
    <div class="clearfix">
      <el-button size="small" type="primary" style="float:right" @click="addClass()">新增分类</el-button>
    </div>
    <el-table style="margin-top:15px;" :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
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
      <el-table-column label="创建时间" width="210" align="center">
        <template slot-scope="scope">
          {{scope.row.create_time}}
        </template>
      </el-table-column>
      <el-table-column label="分类状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag size="mini" :type="scope.row.shelf | shelfTagFilter">{{scope.row.shelf | shelfTextFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="310" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="addClass(scope.row.id,scope.row.name)">编辑</el-button>
          <el-button size="mini" v-if="scope.row.shelf==0" @click="shelf(scope.row.id,1)">上架</el-button>
          <el-button size="mini" type="warning" v-if="scope.row.shelf==1" @click="shelf(scope.row.id,0)">下架</el-button>
          <el-button size="mini" type="danger" @click="handDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getGoodsCategory, shelfClass, delClass, addClass } from "@/api/goods";

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      showCount: 10
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
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.listLoading = true;
      let data = await getGoodsCategory();
      // data = data.data;
      this.list = data.data;
      this.listLoading = false;
    },
    async shelf(id, shelf) {
      let data = await shelfClass({
        id,
        shelf
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
    handDelete(id, name) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let data = await delClass({
          id
        });
        if (data.code == 200) {
          this.$message({
            type: 'success',
            message: '删除成功!',
            onClose: () => {
              this.fetchData();
            }
          });
          //  this.fetchData();
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
      // this.$alert(
      //   "删除这个分类，其包含的所有商品均被删除，确定要删除吗",
      //   "删除商品",
      //   {
      //     confirmButtonText: "确定",
      //     callback: async action => {
      //       let data = await delClass({
      //         id
      //       });
      //       if (data.code == 200) {
      //         this.$message({
      //           message: data.msg,
      //           type: "success",
      //           onClose: () => {
      //             this.fetchData();
      //           }
      //         });
      //       }
      //     }
      //   }
      // );
    },
    addClass(id, val) {
      this.$prompt("请输入分类名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputValue: val,
        inputErrorMessage: "分类名称不能为空"
      })
        .then(async ({ value }) => {
          let data = await addClass({ id, name: value });
          this.$message({
            type: "success",
            message: "分类名称: " + value
          });
          this.fetchData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  }
};
</script>
