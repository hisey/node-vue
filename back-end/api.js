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
    // goodsUploadImg: path + '/goods/upload-img',

    // user
    userList: path + '/user/getList',                               //列表
    userDelete: path + '/user/delete',                              //删除
    userAdd: path + '/user/add',                                    //新增|更新
    userDeleteMulti: path + '/user/deleteMulti',                    //批量删除
    userLogout: path + '/user/logout',                              //注销
    userChangeRole: path + '/user/changeRole',                      //改变角色
    userLogin: path + '/user/login',                            //登陆
    userAutoLogin: path + '/user/autoLogin',                    //自动登陆

    //file
    uploading: '/file/uploading',                                   //文件上传
    rmdir: '/file/rmdir',                                           //文件删除    
};