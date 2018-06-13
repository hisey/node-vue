let express = require('express');
let goods = require('../controls/goods');
let user = require('../controls/user');
let api = require('../api');
let upload = require('../utils/upload');
let rmdir = require('../utils/dir').rmdir;
let router = express.Router();




// goods
router.get(api.goodsList, goods.fetchList);
router.get(api.goodsCategory, goods.fetchCategory);
router.get(api.goodsDetail, goods.fetchById);
router.post(api.goodsAdd, goods.addGoods);
router.post(api.addGoodsCategory, goods.addGoodsCategory);
router.post(api.goodsDelete, goods.deleteGoods);
router.post(api.goodsCategoryDelete, goods.deleteCategory);
router.post(api.goodsDeleteMulti, goods.deleteMulti);
router.post(api.goodsShelf, goods.shelfGoods);
router.post(api.goodsShelfCategory, goods.shelfCategory);
// router.post(api.goodsUploadImg, upload.single('avatar'), goods.uploadGoodsImg); // 图片上传



// adminUser
router.get(api.adminUserList, user.getAdminUserList);   //获取系统用户列表
router.post(api.adminUserLogout, user.logout);  //登出
router.post(api.adminUserAutoLogin, user.autoLogin); // 自动登录
router.post(api.adminUserAdd, user.addAdminUser);  //添加系统用户
router.post(api.adminUserDelete, user.deleteAdminUser); //删除系统用户  
router.post(api.adminUserDeleteMulti, user.deleteAdminUserMulti); //批量删除系统用户
router.post(api.adminUserLogin, user.login); // admin登录
router.post(api.adminUserStatusChange, user.changeAdminUserStatus); // admin登录

//role
router.get(api.adminUserRoleList, user.getAdminUserRoleList); // 获取角色列表
router.post(api.adminUserRoleAdd, user.addAdminUserRole); // 新增角色
router.post(api.adminUserRoleDelete, user.deleteAdminUserRole); // 删除角色
router.post(api.adminRoleStatusChange, user.changeAdminRoleStatus); // 改变角色状态

// router.post(api.userChangeRole, user.controlVisit, user.changeRole); // 更改权限

/* 上传*/
router.post(api.uploading, upload);

router.get(api.rmdir, rmdir);

module.exports = router;