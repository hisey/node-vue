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

    // adminUser
    adminUserList: path + '/adminUser/getList',                               //列表
    adminUserDelete: path + '/adminUser/delete',                              //删除
    adminUserAdd: path + '/adminUser/add',                                    //新增|更新
    adminUserDeleteMulti: path + '/adminUser/deleteMulti',                    //批量删除
    adminUserStatusChange: path + '/adminUser/changeStatus',                  //改变系统用户状态
    adminUserInfo: path + '/adminUser/getUserInfo',                           //获取管理员用户信息
    
    //role
    adminUserRoleList:path + '/adminUser/getRoleList',
    adminUserRoleAdd:path + '/adminUser/addUserRole',
    adminUserRoleDelete:path + '/adminUser/deleteRole',
    adminRoleStatusChange:path + '/adminUser/changeRoleStatus',

    adminUserLogout: path + '/adminUser/logout',                              //注销
    adminUserLogin: path + '/adminUser/login',                                //登陆
    adminUserAutoLogin: path + '/adminUser/autoLogin',                        //自动登陆

    //file
    uploading: '/api/file/uploading',                                   //文件上传
    rmdir: '/api/file/rmdir',                                           //文件删除    
};