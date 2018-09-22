/*各种模块 */
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const session = require('express-session');
global.md5 = require('md5');
const svgCaptcha = require('svg-captcha');
const multer = require('multer');

const app = express();
//定义各种初始数据
let secret = 'sports.app.myweb.www';
// 启用中间件
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(secret));
//模板引擎设置
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', './views');
//数据库连接
global.conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'040116',
    port:3306,
    database:'test'
});
conn.connect();
//启用session
app.use(session({
    secret:secret,
    resave:true,
    saveUninitialized: true,
    cookie: {maxAge:30*24*3600*1000}
}));
// 验证码图片
app.get('/coder', (req, res) => {
    var captcha = svgCaptcha.create({noise:4,ignoreChars: '0o1i', size:1,background: '#cc9966',height:38, width:90});
	req.session.coder = captcha.text;
	
	res.type('svg'); 
    res.status(200).send(captcha.data);  
    // console.log(captcha.data);
});

//方便测试
app.use(function(req ,res, next){
    req.session.aid = 1;
    req.session.username = '王乙霖';
    next();
});
//管理员登录
app.use('/admin/login', require('./module/admin/login'));
//管理员管理子路由
app.use('/admin', require('./module/admin/index'));


//静态资源托管
// app.use('/uploads', express.static('uploads'));
app.use(express.static('static'));

app.listen(81, () => {
    console.log('启动成功..');
});
