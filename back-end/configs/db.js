let env = process.env.NODE_ENV || 'development'
let host = env == 'development' ? 'localhost' : '193.112.202.42';
let password = env == 'development' ? 'root' : 'guowenbo100';
let user = 'root';

module.exports = {
    host,
    port: 3306,
    user,
    password,
    database: 'vue-admin'
};