/**
* @author hisey
* @version 1.0
* @param {[object]} res  [response对象]
* @param {[object]} sql [sql语句：包含查询总数与查询列表内容，格式为：{count:**,list:**}]
* @param {[string]} curentPage [当前页]
* @param {[string]} showCount  [显示个数]
*/
let func = require('../sql/func'); 
let paging = async (res, sql, curentPage, showCount) => {
    let list = [];
    // let totalCount = await func.connPool(`SELECT COUNT(*) FROM ${table}`, [])
    let totalCount = await func.connPool(sql.count, [])
    totalCount = totalCount[0]['COUNT(*)'];
    let totalPages = parseInt(totalCount) / parseInt(showCount);
    let pageStr = totalPages.toString();
    // 不能被整除
    if (pageStr.indexOf('.') > 0) {
        totalPages = parseInt(pageStr.split('.')[0]) + 1;
    }
    if (curentPage <= totalPages) {
        // console.log(sql.list);
        
        // list = await func.connPool(`SELECT * FROM ${table} LIMIT ${start},${showCount}`, [])
        list = await func.connPool(sql.list)
    }
    var arr = list.filter(function (item) {
        item.create_time = new Date(item.create_time).toLocaleString()
        item.update_time = new Date(item.update_time).toLocaleString()
        return item;
    });
    return { totalPages, curentPage, totalCount, arr }
}
module.exports = paging;