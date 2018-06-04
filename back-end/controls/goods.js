let sql = require('../sql/sql');
let moment = require('moment');
let func = require('../sql/func');
let path = require('path');
let time = require('../utils/dateTime').time;

// function formatData(rows) {
//     return rows.map(row => {
//         let date = moment(row.create_time).format('YYYY-MM-DD');
//         return Object.assign({}, row, { create_time: date });
//     });
// }


module.exports = {
    // 获取商品列表
    async fetchAll(req, res) {
        let curentPage = req.query.curentPage;
        let showCount = req.query.showCount
        // console.log(req.params);
        let list=[];
        if (curentPage == '' || curentPage == null || curentPage == undefined) {
            res.end(JSON.stringify({ msg: '请传入当前页码', status: '102' }));
            return;
        }
        if (showCount == '' || showCount == null || showCount == undefined) {
            showCount = "10";
        }
        let start = (curentPage - 1) * parseInt(showCount);
        let totalCount = await func.connPool('SELECT COUNT(*) FROM goods', [])
        totalCount = totalCount[0]['COUNT(*)'];
        let totalPages = parseInt(totalCount) / parseInt(showCount);
        let pageStr = totalPages.toString();
        // 不能被整除
        if (pageStr.indexOf('.') > 0) {
            totalPages = parseInt(pageStr.split('.')[0]) + 1;
        }
        if (curentPage <= totalPages) {
            list = await func.connPool('SELECT * FROM goods LIMIT ' + start + ',' + showCount, [])
        }
        res.json({ code: 200, msg: 'ok', data: { totalPages, curentPage, totalCount, list } });
    },

    // 获取商品详情
    fetchById(req, res) {
        let id = req.body.id;

        func.connPool(sql.queryById, ['goods', id], (err, rows) => {
            // rows = formatData(rows);
            res.json({ code: 200, msg: 'ok', goods: rows[0] });
        });

    },

    // 添加|更新 商品
    async addOne(req, res) {
        let id = req.body.id;
        let body = req.body;
        let query, arr = [];
        Object.keys(body).forEach(function (key) {
            if (key != "id") {
                arr.push(body[key])
            }
        });
        arr.push(time)
        if (id) {
            arr.push(id)
        }
        query = sql.addOrUpdata(body, "goods")
        let data = await func.connPool(query, arr);
        res.send({ code: 200, msg: 'done' });
        // });

    },


    // 删除商品
    deleteOne(req, res) {

        let id = req.body.id;

        func.connPool(sql.del, ['goods', id], (err, rows) => {
            res.send({ code: 200, msg: 'done' });

        });

    },

    // 批量删除
    deleteMulti(req, res) {
        let id = req.body.id;

        func.connPool('DELETE FROM goods WHERE id IN ?', [[id]], (err, rows) => {
            res.send({ code: 200, msg: 'done' });

        });

    },

    uploadGoodsImg(req, res) {
        let absolutePath = path.resolve(__dirname, req.file.path);
        let a = 2;

        func.connPool('UPDATE goods SET imgs = ? WHERE id = ?', [absolutePath, 60], (err, rows) => {
            console.log(a);
            res.send({ code: 200, msg: 'done', url: absolutePath });
        }, res);
    },
};