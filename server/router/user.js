const express = require('express')
const router = express.Router()
//导入mysql模块
const mysql = require('mysql')
const configdb = require('../db/configdb')
const usersql = require('../db/usersql')

//建立mysql连接池
const pool = mysql.createPool(configdb.mysql)

//响应一个JSON数据
const responseJSON = function(res,ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '-200',
            message: '操作失败'
        })
    } else {
        res.json(ret)
    }
}

//添加用户
router.get('/addUser',function (req,res,next) {
    //从连接池获取连接
    pool.getConnection(function (err,connection) {
        //获取前端传来的参数
        const param = req.query || req.params
        //建立连接,增加用户信息
        connection.query(usersql.usersql.insert,[param.userId,param.email,param.password],function (err,result) {
            if (result) {
                result = {
                    code: 200,
                    message: '添加成功'
                }
            }
            //以json形式把结果返回给前端
            responseJSON(res,result)
            //释放连接
            connection.release()
        })
    })
})

//查询用户
router.get('/usersall',function(req,res){
    pool.getConnection(function (err,connection) {
        connection.query(usersql.usersql.queryAll,function(err,result){
            // console.log(result)
            res.send({
                result
            })
            // responseJSON(res,result)
            connection.release()
        })
    })
})

module.exports = router