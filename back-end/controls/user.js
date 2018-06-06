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

module.exports = {
    async fetchAll(req, res) {
        let curentPage = req.query.curentPage;
        let showCount = req.query.showCount
        let data = await paging(res, 'user', curentPage, showCount)
        if (data) {
            res.json({ code: 200, msg: 'ok', data });
        } else {
            res.json({ code: -1, msg: '获取数据失败' });
        }
    },
    // 添加用户
     addOne(req, res) {
        let name = req.body.name;
        let pass = req.body.pass;
        let role = req.body.role;
        let query = 'INSERT INTO user(user_name, password, role) VALUES(?, ?, ?)';

        // 密码加盐
        bcrypt.hash(pass, 10, async (err, hash) => {
            if (err) console.log(err);
            pass = hash;
            let arr = [name, pass, role];
            let data = await func.connPool(query, arr)
            res.json({ code: 200, msg: 'done' });
        });

    },


    // 删除用户
    async deleteOne(req, res) {

        let id = req.body.id;

        let data = await func.connPool(sql.del, ['user', id])
        res.json({ code: 200, msg: 'done' });
        // });

    },

    // 批量删除
    async deleteMulti(req, res) {
        let id = req.body.id;
        let data = await func.connPool('DELETE FROM user WHERE id IN ?', [[id]])
        res.json({ code: 200, msg: 'done' });
    },

    // 登录
    async login(req, res) {
        let user_name = req.body.user_name;
        let pass = req.body.pass;
        let data = await func.connPool('SELECT * from user where user_name = ?', [user_name])
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

        res.json({ code: 200, msg: '注销' });
    },

    // 权限控制
    controlVisit(req, res, next) {
        if (req.session.login.role && req.session.login.role < 10) {
            res.json({ code: 400, msg: '权限不够' });
            return;
        }

        next();
    },

    // 权限变更
    async changeRole(req, res) {
        let role = req.session.login.role;
        let change_role = req.body.change_role;

        if (role !== 100 && change_role === 100) {
            res.json({ code: 400, msg: '权限不够' });
            return;
        }

        let user_id = req.body.id;
        let data = await func.connPool('UPDATE user SET role= ? WHERE id = ?', [change_role, user_id])
        if (data.affectedRows) {
            res.json({ code: 200, msg: 'done' });
        }
        // });

    },

};