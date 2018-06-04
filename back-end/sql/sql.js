module.exports = {
    queryAll: 'SELECT * FROM ??',
    queryById: 'SELECT * FROM ?? WHERE id=?',
    del: 'DELETE FROM ?? WHERE id=?',
    addOrUpdata: (obj, table) => {
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
            query = `INSERT INTO ${table} (${arr2.join(',')},create_time) VALUES(${arr3.join(',')} ,?)`;
        }
        return query
    }
};
