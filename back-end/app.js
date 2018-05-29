let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let session = require('express-session');
let router = require('./routes/router');
let cors = require('cors');
let port = process.env.PORT || 9999;
let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors({
    origin:['http://localhost:8080'],
    methods:['GET','POST'],
    alloweHeaders:['Conten-Type', 'Authorization']
}));

app.use(session({
    secret: 'fuckupig',
    cookie: {maxAge: 3600000},
    resave: true,
    saveUninitialized: true,
}));

app.use(router);

app.listen(port, () => {
    console.log(`devServer start on port:${ port}`);
});