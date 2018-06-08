let fs = require('fs');
let mkdirSync = function (url, mode, cb) {
    var arr = url.split("/");
    mode = mode || 0755;
    cb = cb || function () { };
    if (arr[0] === ".") {//处理 ./aaa
        arr.shift();
    }
    if (arr[0] == "..") {//处理 ../ddd/d
        arr.splice(0, 2, arr[0] + "/" + arr[1])
    }
    function inner(cur) {
        if (!fs.existsSync(cur)) {//不存在就创建一个
            fs.mkdirSync(cur, mode)
        }
        if (arr.length) {
            inner(cur + "/" + arr.shift());
        } else {
            cb();
        }
    }
    arr.length && inner(arr.shift());

}
let rmdir = function (req, res) {
    let url=req.query.url
    fs.rmdir(url, function (e) {
        if (e) {
            //console.log(e)
        }
    })
}

module.exports = { mkdirSync, rmdir };    