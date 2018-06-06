/**
* @author hisey
* @version 1.0
*/
// let fs = require('fs');
let multiparty = require('multiparty');
let mkdirSync = require('./dir').mkdirSync;
let upload = function (req, res) {
    // console.log(req);
    //生成multiparty对象，并配置上传目标路径
    let uploadDir = './uploadFiles/' + req.query.dir
    mkdirSync(uploadDir, 0, function (e) {
        if (e) {
            console.log('出错了');
        } else {
            console.log("创建成功")
        }
    });
    var form = new multiparty.Form({ uploadDir });

    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);
        if (err) {
            console.log('parse error: ' + err);
        } else {
            var inputFile = files.inputFile[0];
            var uploadedPath = inputFile.path;
            uploadedPath = uploadedPath.replace("\\\\", "\/\/").replace("\\", "\/").replace("\\", "\/");
            // var dstPath = './public/files/' + inputFile.originalFilename;
            //重命名为真实文件名
            // fs.rename(uploadedPath, dstPath, function (err) {
            //     if (err) {
            //         console.log('rename error: ' + err);
            //     } else {
            //         console.log('rename ok');
            //     }
            // });
        }
        res.send({ code: 200, msg: uploadedPath });
    });
}

module.exports = upload;