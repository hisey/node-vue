let mysql = require('mysql');
let db = require('../configs/db');
let pool = mysql.createPool(db);

module.exports = {
    connPool(sql, val) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                console.log("successfully connecting to the database");
                console.log('errow is ' + err);
                let q = conn.query(sql, val, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    conn.release()
                });
            });
        });
    },

    // json格式
    writeJson(res, code = 200, msg = 'ok', data = null) {
        let obj = { code, msg, data };

        if (!data) {
            delete obj.data;
        }

        res.send(obj);
    },
};