/**
* @author hisey
* @version 1.0
*/
// 用户controls

let sql = require('../sql/sql');
// let moment = require('moment');
let bcrypt = require('bcryptjs');
let func = require('../sql/func');
let paging = require('../utils/paging');
let addOne = require('../utils/addOne')

module.exports = {
    async getAdminUserList(req, res) {
        let curentPage = req.query.curentPage;
        let showCount = req.query.showCount;
        // //console.log(req.query);
        if (curentPage == '' || curentPage == null || curentPage == undefined) {
            res.json({ code: 102, msg: '请传入当前页码' });
            return;
        }
        if (showCount == '' || showCount == null || showCount == undefined) {
            showCount = "10";
        }
        let start = (curentPage - 1) * parseInt(showCount);
        let sql = {
            count: "SELECT COUNT(*) FROM admin_user",
            list: `SELECT id,user_name,role_name,create_time,update_time,status,role_id FROM admin_user LIMIT ${start},${showCount}`
        }
        //console.log(sql.list);
        let data = await paging(res, sql, curentPage, showCount)
        if (data) {
            res.json({ code: 200, msg: 'done', data });
        } else {
            res.json({ code: -1, msg: '获取数据失败' });
        }
    },
    // 添加用户
    async addAdminUser(req, res) {
        let name = req.body.name;
        let pass = req.body.pass;
        let role_id = req.body.roleId;
        let id = req.body.id;
        let sql = `SELECT name FROM admin_role WHERE id=${role_id}`;
        let query = '';
        let result = await func.connPool(sql);
        let role_name = result[0].name;
        // 密码加盐
        bcrypt.hash(pass, 10, async (err, hash) => {
            if (err) { console.log(err); }
            pass = hash;
            // let arr = [name, pass, role_id, role_name];
            // console.log("用户id为："+pass);
            if (id) {
                // query = `UPDATE admin_user SET user_name=${name}, password=${pass}, role_id=${role_id},role_name=${role_name}, update_time="" WHERE id=${id}`;
            } else {
                query = `INSERT INTO admin_user(user_name, password, role_id , role_name) VALUES('${name}', '${pass}', '${role_id}','${role_name}')`;
            }
            // console.log(query)
            let data = await func.connPool(query)
            res.json({ code: 200, msg: 'done' });
        });
    },
    // async adminUserInfo(req, res){
    //     let data = await func.connPool(sql.queryAll, ["admin_user"]);
    //     let         
    // },
    // 删除用户
    async deleteAdminUser(req, res) {
        let id = req.body.id;
        if (id == 1) {
            res.json({ code: 0, msg: '超级管理员不可删除' });
        }
        let data = await func.connPool(sql.del, ['admin_user', id])
        res.json({ code: 200, msg: 'done' });
    },

    // 批量删除
    async deleteAdminUserMulti(req, res) {
        let id = req.body.id;
        let data = await func.connPool('DELETE FROM admin_user WHERE id IN ?', [[id]])
        res.json({ code: 200, msg: 'done' });
    },

    // 登录
    async login(req, res) {
        let user_name = req.body.user_name;
        let pass = req.body.pass;
        let data = await func.connPool('SELECT * from admin_user where user_name = ?', [user_name])
        if (!data.length) {
            res.json({ code: 400, msg: '用户名不存在' });
            return;
        }
        let password = data[0].password;
        bcrypt.compare(pass, password, (err, sure) => {
            if (sure) {
                let user = {
                    user_id: data[0].user_id,
                    user_name: data[0].user_name,
                    role: data[0].role,
                };

                req.session.login = user;

                res.json({ code: 200, msg: '登录成功', user: user });
            } else {
                res.json({ code: 400, msg: '密码错误' });
            }
        });



    },


    // 自动登录
    autoLogin(req, res) {
        let user = req.session.login;
        if (user) {
            res.json({ code: 200, msg: '自动登录', user: user });
        } else {
            res.json({ code: 400, msg: 'not found' });
        }
    },

    // 注销
    logout(req, res) {
        req.session.login = null;

        res.json({ code: 200, msg: '注销成功' });
    },
    async changeAdminUserStatus(req, res) {
        let id = req.body.id;
        let role_id = req.body.roleId;
        let status = req.body.status;
        let sql1 = `SELECT status FROM admin_role WHERE id = ${role_id}`
        let sql2 = `UPDATE admin_user SET status = ${status} WHERE id = ${id}`;
        if (status == 1) {
            let data1 = await func.connPool(sql1)
            if (data1[0].status == 0) {
                res.send({ code: 200, msg: "所属角色处于禁用状态，故该用户不可启用" });
                return
            }
        }
        let data2 = await func.connPool(sql2)
        res.send({ code: 200, msg: sataus = status == 1 ? "已启用！" : "已禁用！" });
    },

    //获取admin角色
    async getAdminUserRoleList(req, res) {
        let data = await func.connPool(sql.queryAll, ["admin_role"])
        if (data) {
            let arr = data.filter(function (item) {
                item.create_time = new Date(item.create_time).toLocaleString()
                item.update_time = new Date(item.update_time).toLocaleString()
                return item;
            });
            res.json({ code: 200, msg: 'done', data: arr });
        } else {
            res.json({ code: -1, msg: '获取数据失败' });
        }
    },
    //添加|更新用户角色
    async addAdminUserRole(req, res) {
        addOne(req, res, "admin_role")
        let roleName = req.body.name;
        let roleId = req.body.id;
        let sql = `UPDATE admin_user SET role_name=${roleName} WHERE role_id=${roleId}`
        let data = await func.connPool(sql)
        res.send({ code: 200, msg: 'done' });
    },

    // 删除admin用户角色
    async deleteAdminUserRole(req, res) {
        let id = req.body.id;
        if (id == 1) {
            res.json({ code: 0, msg: '超级管理员不可删除' });
        }
        let data1 = await func.connPool(sql.del, ['admin_role', id])
        let data2 = await func.connPool(`DELETE FROM admin_user WHERE role_id = ${id}`)
        res.send({ code: 200, msg: '成功删除！' });
    },
    //改变角色状态
    async changeAdminRoleStatus(req, res) {
        let id = req.body.id;
        let status = req.body.status;
        if (id == 1) {
            res.json({ code: 0, msg: '超级管理员不可禁用' });
        }
        let sql1 = `UPDATE admin_role SET status = ${req.body.status} WHERE id = ${id}`
        let sql2 = `UPDATE admin_user SET status = ${req.body.status} WHERE role_id = ${id}`
        let data1 = await func.connPool(sql1)
        let data2 = await func.connPool(sql2)
        res.send({ code: 200, msg: status = status == 1 ? "已启用！" : "已禁用！" });
    }



    // // 权限控制
    // controlVisit(req, res, next) {
    //     if (req.session.login.role && req.session.login.role < 10) {
    //         res.json({ code: 400, msg: '权限不够' });
    //         return;
    //     }

    //     next();
    // },

    // // 权限变更
    // async changeRole(req, res) {
    //     let role = req.session.login.role;
    //     let change_role = req.body.change_role;

    //     if (role !== 100 && change_role === 100) {
    //         res.json({ code: 400, msg: '权限不够' });
    //         return;
    //     }

    //     let user_id = req.body.id;
    //     let data = await func.connPool('UPDATE admin_user SET role= ? WHERE id = ?', [change_role, user_id])
    //     if (data.affectedRows) {
    //         res.json({ code: 200, msg: 'done' });
    //     }
    //     // });

    // },

};