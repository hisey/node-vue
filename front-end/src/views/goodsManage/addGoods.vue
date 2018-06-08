<template>
   <div class="app-container"> 
    <el-form ref="form" :model="form" label-width="80px" class="form-contain">
        <el-form-item label="商品名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="商品价格">
            <el-input placeholder="请输入内容" v-model="form.price" type='number'>
                <template slot="append">元</template>
            </el-input>
        </el-form-item>

        <el-form-item label="商品库存">
            <el-input-number v-model="form.inventory" :min="0"></el-input-number>
        </el-form-item>

        <el-form-item label="商品上架">
            <el-switch v-model="form.shelf"></el-switch>
        </el-form-item>

        <el-form-item label="商品属性">
          <el-checkbox-group v-model="form.onsale">
              <el-checkbox label="1">推荐</el-checkbox>
              <el-checkbox label="2">优选</el-checkbox>
              <el-checkbox label="3">折扣</el-checkbox>
              <el-checkbox label="4">热门</el-checkbox>
           </el-checkbox-group>
        </el-form-item>

        <el-form-item label="商品图片">
            <el-upload
                class="upload-demo"
                :action="uploadUrl"
                :file-list="form.imgs"
                :on-success="uploadSuccess"
                list-type="picture">
                <el-button size="mini" type="primary">上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" size="small" @click="onSubmit">{{isNew ? '添加商品' : '修改商品'}}</el-button>
            <!-- <el-button @click="onCancel">取消</el-button> -->
        </el-form-item>

    </el-form>
    </div>
</template>

<script>
import { login } from "@/api/goods";
import urls  from '@/utils/env'
export default {
  name: "form1",

  data() {
    return {
      isNew: 1, // 是否是添加
      uploadUrl:urls.basicUrl + '/file/uploading?dir=goodsPic',
      form: {
        id: undefined,
        name: "",
        onsale: 0,
        inventory: 0,
        price: 0,
        category: [],
        imgs: [],
        checkList:[]
      }
    };
  },
  methods: {
    // uploadSuccess(response, file, fileList){
    //     console.log(response);
    //     console.log(file);
    //     console.log(fileList);
    // },
    onSubmit() {
      if (!this.form.name) {
        this.$message.warning("请填写完整信息");
        return;
      }
      

      // this.func.ajaxPost(this.api.goodsAdd, this.form, res => {
      //     if (res.data.code === 200) {
      //         this.$message.success('操作成功');
      //         this.$router.push('/admin/goods-list');
      //     }
      // });
    },
    onCancel() {
      this.$router.push("/admin/goods-list");
    }
  },

  created() {
    let id = this.$route.query.id;
    // console.log(this.uploadUrl);
    
    if (id) {
      this.isNew = 0;

      this.func.ajaxPost(this.api.goodsDetail, { id }, res => {
        this.form = res.data.goods;
        this.form.id = res.data.goods.id;
      });
    }
  }
};
</script>