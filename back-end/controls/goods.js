let sql = require('../sql/sql');
// let moment = require('moment');
let func = require('../sql/func');
let path = require('path');
let paging = require('../utils/paging');
let addOne = require('../utils/addOne')


module.exports = {
    // 获取商品列表
    async fetchList(req, res) {
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
        let id = req.body.id;
        let sql = ""
        if (id) {
            sql = `SELECT * FROM goodsCategory WHERE superior_id=${id}`;
        } else {
            sql = `SELECT * FROM goodsCategory WHERE level=1`;
        }
        let data = await func.connPool(sql)
        if (data) {
            res.json({ code: 200, msg: 'ok', data });
        } else {
            res.json({ code: -1, msg: '获取数据失败' });
        }
    },

    // 获取商品详情
    async fetchById(req, res) {
        let id = req.query.id;
        // console.log(id)
        let data = await func.connPool(sql.queryById, ['goods', id])
        data = data[0];
        data.create_time = new Date(data.create_time).toLocaleString()
        data.update_time = new Date(data.update_time).toLocaleString()
        console.log(sql.queryById)
        console.log(data)
        res.json({ code: 200, msg: 'ok', goods: data });
    },

    // 添加|更新 商品
    addGoods(req, res) {
        addOne(req, res, "goods")
    },

    // 添加|更新 商品分类
    addGoodsCategory(req, res) {
        addOne(req, res, "goodsCategory")
    },

    // 删除商品
    async deleteGoods(req, res) {
        let id = req.body.id;
        let data = await func.connPool(sql.del, ['goods', id])
        res.send({ code: 200, msg: 'done' });
    },

    // 删除商品分类
    async deleteCategory(req, res) {
        let id = req.body.id;
        let data = await func.connPool(sql.del, ['goodsCategory', id])
        res.send({ code: 200, msg: 'done' });
    },

    // 批量删除
    async deleteMulti(req, res) {
        let id = req.body.id;
        let data = await func.connPool('DELETE FROM goods WHERE id IN ?', [[id]])
        res.send({ code: 200, msg: 'done' });
    },

    //上架与下架商品|分类
    async shelfGoods(req, res) {
        let id = req.body.id;
        let shelf
        let data = await func.connPool()
    }
};