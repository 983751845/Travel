const express = require('express');
const router = express.Router();
//管理员登录
router.get('/', (req, res)=>{
    res.render('admin/login');
});

//登录验证
router.post('/', (req, res)=>{
    let d = req.body;
    //首先验证验证码
    if(d.coder.toLowerCase() != req.session.coder.toLowerCase()){
        res.json({r:'coder_err'});
        return ;
    }
    //进行数据验证
    let sql = 'SELECT * FROM admin WHERE username = ?';
    conn.query(sql, d.username, (err, result)=>{
        //账号是不是存在
        if(!result.length){
            res.json({r:'u_not'});
            return ;
        }
        //判断密码是否正确
        if(d.passwd != result[0].passwd){
            res.json({r:'p_err'});
            return ;
        }
        //登录成功
        //保存session信息
        req.session.aid = result[0].aid;
        req.session.username = result[0].username;
        //更新状态
        // let sql = 'UPDATE SET admin loginnums = loginnums + 1, lasttimes = ? WHERE aid = ?';
        // conn.query(sql, [new Date().toLocaleString(), result[0].aid], (err, result)=>{
        //     res.json({r:'ok'});
        // });
        res.json({r:'ok'});
    });
});


module.exports = router;