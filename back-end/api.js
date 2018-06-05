let path = '/api/admin';

module.exports = {
    // goods
    goodsList: path + '/goods/list',
    goodsCategory: path + '/goods/goodsCategory',
    goodsDetail: path + '/goods/detail',
    goodsDelete: path + '/goods/delete',
    goodsAdd: path + '/goods/addGoods',
    addGoodsCategory: path + '/goods/addGoodsCategory',
    goodsDeleteMulti: path + '/goods/delete-multi',
    goodsUploadImg: path + '/goods/upload-img',

    // user
    userList: path + '/user/list',
    userDelete: path + '/user/delete',
    userAdd: path + '/user/add',
    userDeleteMulti: path + '/user/delete-multi',
    userLogout: path + '/user/logout',
    userChangeRole: path + '/user/change-role',
    userLogin: '/api/user/login',
    userAutoLogin: '/api/user/auto-login',
};