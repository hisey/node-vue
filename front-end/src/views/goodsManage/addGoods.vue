<template>
  <div class="app-container">
    <el-form ref="goodsForm" :model="goodsForm" :rules="goodsFormRule" label-width="80px" class="form-contain">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="goodsForm.name"></el-input>
      </el-form-item>

      <el-form-item label="商品价格" prop="price">
        <el-input placeholder="请输入内容" v-model="goodsForm.price" type="number">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>

      <el-form-item label="商品库存" prop="inventory">
        <el-input-number v-model="goodsForm.inventory" :min="0"></el-input-number>
      </el-form-item>

      <!-- <el-form-item label="商品上架" prop="shelf">
        <el-switch v-model="goodsForm.shelf"></el-switch>
      </el-form-item> -->
      <el-form-item label="商品类别" prop="category_id">
        <el-select v-model="goodsForm.category_id" placeholder="请选择">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品属性" prop="onsale">
        <el-checkbox-group v-model="goodsForm.onsale">
          <el-checkbox label="1" name="onsale">推荐</el-checkbox>
          <el-checkbox label="2" name="onsale">优选</el-checkbox>
          <el-checkbox label="3" name="onsale">折扣</el-checkbox>
          <el-checkbox label="4" name="onsale">热门</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="商品封面" prop="cover">
        <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="goodsForm.cover" :src="picUrl + goodsForm.cover" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品图片" prop="imgs">
        <el-upload class="upload-demo" :action="uploadUrl" :on-success="handleImgSuccess" :on-remove="handleImgRemove" :file-list="goodsForm.fileList" list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品描述" prop="description">
        <div id="editor">

        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="submitForm('goodsForm')">確定</el-button>
        <!-- <el-button @click="resetForm('goodsForm')">重置</el-button> -->
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { getGoodsCategory, addGoods, getGoodsDetail } from "@/api/goods";
import urls from "@/utils/env";
import { param, parseQueryString } from "@/utils";
import E from 'wangEditor';
export default {
  name: "goodsFrom",
  data() {
    return {
      isNew: 1, // 是否是添加
      uploadUrl: urls.basicUrl + "/api/file/uploading?dir=goodsPic",
      goodsForm: {
        id: undefined,
        name: "",
        onsale: [],
        shelf: 0,
        inventory: 0,
        price: "",
        category_id: "",
        imgs: [],
        fileList: [],
        cover: "",
        description: ""
      },
      goodsFormRule: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' },
        { min: 3, max: 100, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
        price: [{ required: true, message: '请输入商品价格', trigger: 'blur' },
        { pattern: "^\\d*\\.?\\d+$", message: '请输入正确的格式', trigger: 'blur' }],
        category_id: [{ required: true, message: '请选择商品类别', trigger: 'blur' }]
      },
      picUrl: urls.basicUrl,
      options: []
    };
  },
  methods: {
    async getGoodClass() {
      let data = await getGoodsCategory();
      this.options = data.data;
    },
    handleAvatarSuccess(res, file) {
      this.goodsForm.cover = res.msg;
    },
    handleImgSuccess(res, file) {
      this.goodsForm.fileList.push({ name: file.name, url: this.picUrl + file.response.msg })
      // console.log(this.goodsForm.fileList);
    },
    handleImgRemove(file) {
      let index = 0;
      let num = 0;
      let uid = file.uid;
      let arr = this.goodsForm.fileList;
      // console.log(file);   
      for (index in arr) {
        if (arr[index].uid == uid) {
          num = index;
        }
      }
      // console.log(this.goodsForm.fileList);      
      this.goodsForm.fileList.splice(num, 1)
      console.log(this.goodsForm.fileList);
      // this.goodsForm.imgs = arr;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // console.log(this.goodsForm.fileList);
          let arr = [];
          let fileList = this.goodsForm.fileList;
          if (fileList && fileList.length > 0) {
            for (let i = 0; i < fileList.length; i++) {
              arr.push(param(fileList[i]));
              arr[i] = arr[i].replace(urls.basicUrl, "");
            }
            this.goodsForm.imgs = arr.toString();
          } else {
            this.goodsForm.imgs = '';
          }
          let postData = this.goodsForm;
          delete postData.fileList;
          // console.log();
          let data = await addGoods(postData);
          if (data.code == 200) {
            this.$message({
              type: 'success',
              message: '操作成功!',
              onClose: () => {
                this.$router.go(-1)
              }
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async fecthDate(id) {
      let data = await getGoodsDetail({ id });
      data = data.goods;
      let imgs = data.imgs == null || data.imgs == " " ? [] : data.imgs.split(',');
      let arr = [];
      data.onsale = data.onsale == null ? [] : data.onsale.split(',');
      data.price = data.price.toString();
      delete data.create_time;
      delete data.update_time;
      // data.fileList = [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
      // console.log(imgs == null || " ");
      if (imgs.length > 0) {
        for (let i = 0; imgs.length > i; i++) {
          arr.push(parseQueryString(imgs[i]))
          arr[i].url = urls.basicUrl + arr[i].url
        }
        data.fileList = arr;
      } else {
        data.fileList = [];
      }
      this.goodsForm = data;
      this.createEditor()

    },
    createEditor() {
      var editor = new E('#editor');
      // console.log(editor);
      editor.customConfig.onchange = (html) => {
        this.goodsForm.description = html;
      }
      editor.create();
      editor.txt.html(this.goodsForm.description);
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getGoodClass();
    if (this.id) {
      this.fecthDate(this.id)
    } else {
      this.createEditor();
    }
  }
};
</script>


<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>