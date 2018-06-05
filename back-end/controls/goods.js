let sql = require('../sql/sql');
let moment = require('moment');
let func = require('../sql/func');
let path = require('path');
let paging = require('../utils/paging');
let time = require('../utils/dateTime').time;

// 共用方法---新增
async function addOne(req, res, table) {
    let id = req.body.id;
    let body = req.body;
    let query, arr = [];
    Object.keys(body).forEach(function (key) {
        let val = body[key]
        val = val == "" ? "0" : val
        if (key != "id") {
            arr.push(val)
        }
    });
    arr.push(time)
    if (id) {
        arr.push(id)
    }
    // console.log(arr);
    query = sql.addOrUpdata(body, table)
    // console.log(query);
    let data = await func.connPool(query, arr);
    res.send({ code: 200, msg: 'done' });
}

module.exports = {
    // 获取商品列表
    async fetchAll(req, res) {
        let curentPage = req.query.curentPage;
        let showCount = req.query.showCount
        let sql = {
            count: 'SELECT COUNT(*) FROM goods',
            list: `SELECT * FROM goods LIMIT ${curentPage},${showCount}`
        }
        let data = await paging(res, sql, curentPage, showCount)
        if (data) {
            res.json({ code: 200, msg: 'ok', data });
        } else {
            res.json({ code: -1, msg: '获取数据失败' });
        }
    },

    //获取商品分类
    async fetchCategory(req, res) {
        let curentPage = req.query.curentPage;
        let showCount = req.query.showCount;
        let sql = {
            count: 'SELECT COUNT(*) FROM goodsCategory WHERE category_id=0',
            list: `SELECT * FROM goodsCategory LIMIT ${curentPage},${showCount}`
        }
        let data = await paging(res, sql, curentPage, showCount)
        if (data) {
            res.json({ code: 200, msg: 'ok', data });
        } else {
            res.json({ code: -1, msg: '获取数据失败' });           
        }
    },


    // 获取商品详情
    async fetchById(req, res) {
        let id = req.body.id;
        let data = await func.connPool(sql.queryById, ['goods', id])
        res.json({ code: 200, msg: 'ok', goods: data[0] });
    },

    // 添加|更新 商品
    addGoods(req, res) {
        addOne(req, res, "goods")
    },
    // 添加|更新 商品分类
    addGoodsCategory(req, res) {
        addOne(req, res, "goodsCategory")
    },

    // 添加|更新 分类
    // async addOneClass(req, res) {
    //     let id = req.body.id;
    //     let body = req.body;
    //     let query, arr = [];
    //     Object.keys(body).forEach(function (key) {
    //         if (key != "id") {
    //             arr.push(body[key])
    //         }
    //     });
    //     arr.push(time)
    //     if (id) {
    //         arr.push(id)
    //     }
    //     query = sql.addOrUpdata(body, "goodsCategory")
    //     let data = await func.connPool(query, arr);
    //     res.send({ code: 200, msg: 'done' });
    //     // });

    // },


    // 删除商品
    async deleteOne(req, res) {

        let id = req.body.id;

        let data = await func.connPool(sql.del, ['goods', id])
        res.send({ code: 200, msg: 'done' });
    },

    // 批量删除
    async deleteMulti(req, res) {
        let id = req.body.id;
        let data = await func.connPool('DELETE FROM goods WHERE id IN ?', [[id]])
        res.send({ code: 200, msg: 'done' });
    },

    // 上传商品图片
    async uploadGoodsImg(req, res) {
        let absolutePath = path.resolve(__dirname, req.file.path);
        // let a = 2;
        let data = await func.connPool('UPDATE goods SET imgs = ? WHERE id = ?', [absolutePath, 60])
        // console.log(a);
        res.send({ code: 200, msg: 'done', url: absolutePath });
        // }, res);
    },
};