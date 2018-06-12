let func = require('../sql/func');
let time = require('../utils/dateTime').time;
let addOrUpdataSql = function (obj, table) {
    let id = obj.id;
    let query, arr1 = [], arr2 = [], arr3 = [];
    Object.keys(obj).forEach(function (key) {
        if (key != "id") {
            arr1.push(`${key}=?`)
            arr2.push(key)
            arr3.push('?')
        }
    });
    if (id) {
        // 更新
        query = `UPDATE ${table} SET ${arr1.join(',')} , update_time=? WHERE id=?`;
    } else {
        // 新增
        query = `INSERT INTO ${table} (${arr2.join(',')},create_time) VALUES(${arr3.join(',')},?)`;
    }
    return query
}
let addOne = async(req, res, table)=> {
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
    query = addOrUpdataSql(body, table)
    console.log(query);
    
    let data = await func.connPool(query, arr);
    res.send({ code: 200, msg: 'done' });
}

module.exports = addOne