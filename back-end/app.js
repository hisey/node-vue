let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let session = require('express-session');
let router = require('./routes/router');
let cors = require('cors');
let port = 9999;
let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//配置跨域
let allowDomain = app.get('env') == "development" ? "http://localhost:4865" : "http://193.112.202.42:4865"
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', allowDomain);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
};
app.use(allowCrossDomain)


// 配置session
app.use(session({
    secret: 'fuckupig',
    cookie: { maxAge: 36000000 },
    resave: true,
    saveUninitialized: true,
}));

//配置拦截器
app.use(function (req, res, next) {
    var url = req.url;
    if (url.indexOf("admin") > -1 && url.indexOf("login") == -1) {
        var user = req.session.login;
        //console.log(req.session);
        if (user) {
            next();
        }
        else {
            return res.json({ code: 301, msg: '用户未登陆' });
        }
    }
    else {
        next();
    }
});

app.use(router);

app.listen(port, () => {
    //console.log(`devServer start on port:${port}`);
    //console.log(allowDomain);
});