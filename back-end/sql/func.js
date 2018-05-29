let mysql = require('mysql');
let db = require('../configs/db');
let pool = mysql.createPool(db);

module.exports = {
    connPool (sql, val, cb) {
        pool.getConnection((err, conn) => {
            console.log("连接成功");
            let q = conn.query(sql, val, (err, rows) => {
              
                if (err) {
                    console.log("查询失败"+err);
                }

                console.log("返回的数据为："+ JSON.stringify(rows));

                cb(err, rows);

                conn.release();
            });
        });
    },

    // json格式
    writeJson(res, code = 200, msg = 'ok', data = null) {
        let obj = {code, msg, data};

        if (!data) {
            delete obj.data;
        }

        res.send(obj);
    },
};