let sql = require('../sql/sql');
let func = require('../sql/func');
let path = require('path');
let paging = require('../utils/paging');
let addOne = require('../utils/addOne')


module.exports = {
    // 获取商品列表
    async fetchList(req, res) {
        let curentPage = req.query.curentPage;
        let showCount = req.query.showCount;
        try {
            if (curentPage == '' || curentPage == null || curentPage == undefined) {
                throw new Error('请传入当前页码')
            }
        } catch (err) {
            console.log(err.message, err);
            res.json({
                code: 102,
                msg: err.message
            });
            return;
        }
        if (showCount == '' || showCount == null || showCount == undefined) {
            showCount = "10";
        }
        let start = (curentPage - 1) * parseInt(showCount);
        let sql = {
            count: 'SELECT COUNT(*) FROM goods',
            list: `SELECT * FROM goods LIMIT ${start},${showCount}`
        }
        let data = await paging(res, sql, curentPage, showCount)
        // console.log(data)
        if (data.arr.length == 0 && start > 0) {
            start = start - 1;
            curentPage = curentPage - 1;
            sql.list = `SELECT * FROM goods LIMIT ${start},${showCount}`;
            data = await paging(res, sql, curentPage, showCount);
        }
        if (data) {
            res.json({
                code: 200,
                msg: 'done',
                data
            });
        } else {
            res.json({
                code: -1,
                msg: '获取数据失败'
            });
        }
    },

    //获取商品分类
    async fetchCategory(req, res) {
        // let id = req.body.id;
        let data = await func.connPool(sql.queryAll, ["goods_category"])
        if (data) {
            let arr = data.filter(function (item) {
                item.create_time = new Date(item.create_time).toLocaleString()
                item.update_time = new Date(item.update_time).toLocaleString()
                return item;
            });
            res.json({
                code: 200,
                msg: 'done',
                data: arr
            });
        } else {
            res.json({
                code: -1,
                msg: '获取数据失败'
            });
        }
    },

    // 获取商品详情
    async fetchById(req, res) {
        let id = req.query.id;
        // //console.log(id)
        let data = await func.connPool(sql.queryById, ['goods', id])
        data = data[0];
        // data.create_time = new Date(data.create_time).toLocaleString()
        // data.update_time = new Date(data.update_time).toLocaleString()
        //console.log(sql.queryById)
        // console.log(data)
        data.imgs = data.imgs == 0 ? "" : data.imgs
        res.json({
            code: 200,
            msg: 'done',
            goods: data
        });
    },

    // 添加|更新 商品
    async addGoods(req, res) {
        let sql = `SELECT name FROM goods_category WHERE id=${req.body.category_id}`;
        let shelf;
        let result = await func.connPool(sql)
        req.body.category_name = result[0].name;
        req.body.onsale = req.body.onsale.toString();
        // req.body.imgs = req.body.imgs.length > 0 ? req.body.imgs.toString() : "";
        // req.body.imgs=JSON.stringify(req.body.imgs);
        console.log(req.body);

        addOne(req, res, "goods")
    },

    // 添加|更新 商品分类
    async addGoodsCategory(req, res) {
        addOne(req, res, "goods_category")
        let categoryName = req.body.name;
        let categoryId = req.body.id;
        let sql = `UPDATE goods SET category_name=${categoryName} WHERE category_id=${categoryId}`
        let data = await func.connPool(sql)
        res.send({
            code: 200,
            msg: 'done'
        });
    },

    // 删除商品
    async deleteGoods(req, res) {
        let id = req.body.id;
        let data = await func.connPool(sql.del, ['goods', id])
        res.send({
            code: 200,
            msg: '成功删除！'
        });
    },

    // 删除商品分类
    async deleteCategory(req, res) {
        let id = req.body.id;
        let data1 = await func.connPool(sql.del, ['goods_category', id])
        let data2 = await func.connPool(`DELETE FROM goods WHERE category_id = ${id}`)
        res.send({
            code: 200,
            msg: '成功删除！'
        });
    },

    // 批量删除
    async deleteMulti(req, res) {
        let id = req.body.id;
        let data = await func.connPool(`DELETE FROM goods WHERE id IN (${id})`)
        res.send({
            code: 200,
            msg: '成功删除！'
        });
    },


    //上架与下架商品|分类
    async shelfGoods(req, res) {
        let id = req.body.id;
        let category_id = req.body.category_id
        let shelf = req.body.shelf;
        let sql1 = `SELECT shelf FROM goods_category WHERE id = ${category_id}`
        let sql2 = `UPDATE goods SET shelf = ${shelf} WHERE id = ${id}`;
        let data1 = await func.connPool(sql1)
        if (shelf == 1 && data1[0].shelf == 0) {
            res.send({
                code: 200,
                msg: "所属分类处于下架状态，故该商品不可上架"
            });
            return
        }
        let data2 = await func.connPool(sql2)
        res.send({
            code: 200,
            msg: shelf = shelf == 1 ? "已上架！" : "已下架！"
        });
    },
    async shelfCategory(req, res) {
        let id = req.body.id;
        let shelf = req.body.shelf;
        let sql1 = `UPDATE goods_category SET shelf = ${req.body.shelf} WHERE id = ${id}`
        let sql2 = `UPDATE goods SET shelf = ${req.body.shelf} WHERE category_id = ${id}`
        let data1 = await func.connPool(sql1)
        let data2 = await func.connPool(sql2)
        res.send({
            code: 200,
            msg: shelf = shelf == 1 ? "已上架！" : "已下架！"
        });
    }
};