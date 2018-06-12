let path = '/api/admin';

module.exports = {
    // goods
    goodsList: path + '/goods/getList',                            //获取列表
    goodsCategory: path + '/goods/getCategory',                    //获取分类
    goodsDetail: path + '/goods/getDetail',                        //获取详情
    goodsDelete: path + '/goods/deleteGoods',                      //删除商品
    goodsCategoryDelete: path + '/goods/deleteCategory',           //删除分类
    goodsAdd: path + '/goods/addGoods',                            //新增|更新商品
    addGoodsCategory: path + '/goods/addCategory',                 //新增|更新分类
    goodsDeleteMulti: path + '/goods/deleteMulti',                 //批量删除商品
    goodsShelf: path + '/goods/shelf',                             //下架商品
    goodsShelfCategory: path + '/goods/shelfCategory',             //下架分类
    // goodsUploadImg: path + '/goods/upload-img',

    // user
    adminUserList: path + '/user/getList',                               //列表
    adminUserDelete: path + '/user/delete',                              //删除
    adminUserAdd: path + '/user/add',                                    //新增|更新
    adminUserDeleteMulti: path + '/user/deleteMulti',                    //批量删除
    adminUserLogout: path + '/user/logout',                              //注销
    userChangeRole: path + '/user/changeRole',                      //改变角色
    adminUserLogin: path + '/user/login',                                //登陆
    adminUserAutoLogin: path + '/user/autoLogin',                        //自动登陆

    //file
    uploading: '/api/file/uploading',                                   //文件上传
    rmdir: '/api/file/rmdir',                                           //文件删除    
};