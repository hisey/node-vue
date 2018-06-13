<template>
  <div class="app-container">
    <div class="clearfix">
      <el-button size="small" type="primary" style="float:right" @click="addAdminUser()">新增用户</el-button>
    </div>
    <el-table style="margin-top:15px;" :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="用户名称" align="center">
        <template slot-scope="scope">
          {{scope.row.user_name}}
        </template>
      </el-table-column>
      <el-table-column label="所属角色" align="center">
        <template slot-scope="scope">
          {{scope.row.role_name}}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="210" align="center">
        <template slot-scope="scope">
          {{scope.row.create_time}}
        </template>
      </el-table-column>
      <el-table-column label="用户状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag size="mini" :type="scope.row.status | tagFilter">{{scope.row.status | textFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="310" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="addAdminUser(scope.row.id)">编辑</el-button>
          <el-button size="mini" v-if="scope.row.status==0" @click="changeStatus(scope.row.id,1,scope.row.role_id)">启用</el-button>
          <el-button size="mini" type="warning" v-if="scope.row.status==1" @click="changeStatus(scope.row.id,0,scope.row.role_id)">禁用</el-button>
          <el-button size="mini" type="danger" @click="handDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top:20px;" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="showCount" layout="total, prev, pager, next,jumper" :total="total">
    </el-pagination>

    <el-dialog title="新增/编辑用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules='formRules' ref="form">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id" :label-width="formLabelWidth">
          <el-select v-model="form.role_id" placeholder="请选择角色">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="pass">
          <el-input type="password" v-model="form.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="rePass">
          <el-input type="password" v-model="form.rePass" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAdminUserList, changeAdminUserStatus, delAdminUser, addAdminUser, getAdminRoleList } from "@/api/user";

export default {
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      list: null,
      listLoading: true,
      showCount: 10,
      total: 1,
      currentPage: 1,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        id: "",
        name: '',
        role_id: '',
        pass: '',
        rePass: ''
      },
      options: [],
      formRules: {
        name: [{
          required: true, message: '请输入用户名称', trigger: 'blur'
        }, {
          min: 3, max: 100, message: '长度在 3 到 5 个字符', trigger: 'blur'
        }],
        role_id: [
          { required: true, message: "请选择角色", trigger: 'blur' }
        ],
        pass: [{
          min: 3, max: 100, message: '长度在 3 到 5 个字符', trigger: 'blur'
        }, {
          required: true, message: "请输入密码", trigger: 'blur'
        }, {
          pattern: "^(?![0-9]+$)(?![a-zA-Z]+$)[A-Za-z_][A-Za-z_0-9]{0,}$", message: '要求数字，字母和下划线（至少包含其中两种，数字不能开头', trigger: 'blur'
        }],
        rePass: [{
          required: true, message: "请确认密码", trigger: 'blur'
        },
        { validator: validatePass, trigger: 'blur' }
        ]
      }
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
    this.getRoleList();
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    async fetchData() {
      this.listLoading = true;
      let data = await getAdminUserList({
        curentPage: this.currentPage,
        showCount: this.showCount
      });
      // data = data.data;
      this.list = data.data.arr;
      this.listLoading = false;
      this.total = data.totalCount;
      this.pageSize = data.totalPages;
    },
    async getRoleList() {
      let data = await getAdminRoleList();
      this.options = data.data;
    },
    async changeStatus(id, status, roleId) {
      let data = await changeAdminUserStatus({
        id,
        status,
        roleId
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
        let data = await delAdminUser({
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
    },
    addAdminUser(id) {
      this.id = id;
      this.dialogFormVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let data = await addAdminUser(
            this.form
          );
          if (data.code == 200) {
            this.$message({
              message: data.msg,
              type: "success",
              onClose: () => {
                this.dialogFormVisible = false,
                  this.fetchData();
              }
            });
          }
          // alert('submit!');
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
