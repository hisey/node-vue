let express = require('express');
let bodyParser = require('body-parser'); //请求体解析中间件
let path = require('path');
let session = require('express-session');
let router = require('./routes/router');
let cors = require('cors');
let port = 9999;
let app = express();

//application/x-www-form-urlencoded 解析
app.use(bodyParser.urlencoded({ extended: true }));

//application/json 解析
app.use(bodyParser.json());

//配置跨域
let allowDomain = app.get('env') == "development" ? "http://localhost:4865" : "http://193.112.202.42:4865"
app.use(cors({
    origin: allowDomain,
    methods: ['GET', 'POST'],
    alloweHeaders: ['Conten-Type', 'Authorization'],
    credentials: true    // 是否带cookie
}));


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
        if (user) {
            next();
        } else {
            return res.json({ code: 301, msg: '用户未登陆' });
        }
    } else {
        next();
    }
});
//配置路由
app.use(router);

//设置静态目录
app.use(express.static(path.join(__dirname, './public')));


//开启服务
app.listen(port, () => {
    console.log(`devServer start on port:${port}`);
});