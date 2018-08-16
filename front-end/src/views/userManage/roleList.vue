<template>
  <div class="app-container">
    <div class="clearfix">
      <el-button size="small" type="primary" style="float:right" @click="addRole()">新增角色</el-button>
    </div>
    <el-table style="margin-top:15px;" :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="角色名称" align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="210" align="center">
        <template slot-scope="scope">
          {{scope.row.create_time}}
        </template>
      </el-table-column>
      <el-table-column label="角色状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag size="mini" :type="scope.row.status | tagFilter">{{scope.row.status | textFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="角色描述" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.description}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="310" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="addRole(scope.row.id,scope.row.name)">编辑</el-button>
          <el-button size="mini" v-if="scope.row.status==0&&scope.row.id!=1" @click="changeStatus(scope.row.id,1)">启用</el-button>
          <el-button size="mini" type="warning" v-if="scope.row.status==1&&scope.row.id!=1" @click="changeStatus(scope.row.id,0)">禁用</el-button>
          <el-button size="mini" type="danger" v-if="scope.row.id!=1" @click="handDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getAdminRoleList, changeAdminRoleStatus, delAdminUserRole, addAdminUserRole } from "@/api/user";

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      showCount: 10
    };
  },
  filters: {
    tagFilter(status) {
      const statusMap = {
        0: "info",
        1: "success"
      };
      return statusMap[status];
    },
    textFilter(status) {
      const statusMap = {
        1: "启用",
        0: "禁用"
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
      let data = await getAdminRoleList();
      // data = data.data;
      this.list = data.data;
      this.listLoading = false;
    },
    async changeStatus(id, status) {
      let data = await changeAdminRoleStatus({
        id,
        status
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
    handDelete(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let data = await delAdminUserRole({
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
    addRole(id, val) {
      this.$prompt("请输入分类名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputValue: val,
        inputErrorMessage: "角色名称不能为空"
      })
        .then(async ({ value }) => {
          let data = await addAdminUserRole({ id, name: value });
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
