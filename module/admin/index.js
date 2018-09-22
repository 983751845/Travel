const express = require('express');
const router = express.Router();
//登录验证
router.use((req, res, next)=>{
    if(!req.session.aid){
         res.redirect('/admin/login');
        return ;
    }
    next();
});

router.get('/', (req, res)=>{
    let data={};
    data.username = req.session.username;
    res.render('admin/index',data);
});

//门票添加
router.get('/ticketsadd',(req,res)=>{
    let data = {};
    data.username = req.session.username;
    res.render('admin/ticketsadd',data);
})

router.post('/ticketadd',(req,res)=>{
    let jname=req.body.adname;
    let price=req.body.adprice;
    let sql='INSERT INTO admis(adname,adprice, aid, username, addtimes) VALUES (?,?,?,?,?)';
    let data = [jname,price,req.session.aid,req.session.username,new Date().toLocaleString()];
    conn.query(sql,data,(err,result)=>{
        if(err){
            console.log(err);
            res.json({r:'add_err'});
            return ;
        }
        // console.log(username)
        res.json({r:'success'});
    })
})

//门票管理
router.get('/ticketslist',(req,res)=>{
    let data = {};
    data.username = req.session.username;
    let sql= 'SELECT * FROM admis '
    conn.query(sql,(err,result)=>{
        data.ticketslist = result;
        res.render('admin/ticketslist',data);
    })
})
//门票信息修改

router.get('/updatetickets', (req, res)=>{
    let data={};
    data.username = req.session.username;
    //获取原始信息
    let cid =  req.query.cid;
    if(!cid){
        res.send('请选择你要修改的门票');
        return ;
    }
    let sql = 'SELECT * FROM admis WHERE adid = ? ';
    conn.query(sql, cid, (err, results)=>{
        console.log(results)
        data.cate = results[0];
        res.render('admin/updatetickets', data);
    });
    
});
router.post('/updatetickets', (req, res)=>{
    let d = req.body;
    console.log(d);
    let data= [d.adname,d.adprice, d.adid];
    let sql = 'UPDATE admis SET adname = ? , adprice = ?WHERE adid = ?';
    conn.query(sql, data, (err, result)=>{
        if(err){
            console.log(err);
            res.json({r:'db_err'});
            return ;
        }
        res.json({r:'success'});
    });
});







module.exports = router;