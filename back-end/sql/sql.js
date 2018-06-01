let forStr = (str) => {
    let arr1 = [];
    let arr2 = str.split(",")
    for (let i = 0; i < arr2.length; i++) {
        arr1.push(arr2[i] + '=?')
    }
    str = arr1.join(',')
    return str
}
let forPro = (str) => {
    let str2 = '';
    str = str.join(',')
    for (let i = 0; i < str.length; i++) {
        str2 = str2 + '?'
    }
    return str2
}
module.exports = {
    queryAll: 'SELECT * FROM ??',
    queryById: 'SELECT * FROM ?? WHERE id=?',
    del: 'DELETE FROM ?? WHERE id=?',
    updata: (table, str, id) => 'UPDATE' + table + 'SET ' + forStr(str) + ' WHERE ' + id + '=?',
    add: (table, str) => 'INSERT INTO ' + table + '(' + str + ') VALUES(' + forPro(str) + ')'
};
