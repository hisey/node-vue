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
router.get(api.adminUserList, user.fetchAll);
router.post(api.adminUserLogout, user.logout);
router.post(api.adminUserAutoLogin, user.autoLogin); // 自动登录

router.post(api.adminUserAdd, user.addOne);
router.post(api.adminUserDelete, user.deleteOne);
router.post(api.adminUserDeleteMulti, user.deleteMulti);
router.post(api.adminUserLogin, user.login); // 登录
router.post(api.userChangeRole, user.controlVisit, user.changeRole); // 更改权限

/* 上传*/
router.post(api.uploading, upload);

router.get(api.rmdir, rmdir);

module.exports = router;