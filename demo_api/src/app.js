const express = require('express');

const bodyParser = require('body-parser');

const app = express();

//导入model
const models = require("../models");

//for parsing application/json
app.use(express.json());

//for parsing application/xwww-form-urlencoded
app.use(express.urlencoded());

//for parsing application/xwww-form-urlencoded
//对body参数进行encodeed
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/list/:status/:page',async (req, res, next)=>{
    let {status,page} = req.params;
    let limit = 10;
    let offset = (page-1)*limit;
    let where = {};
    if (!where) {
        where.status = status;
    }
    // 1.状态  1 表示代办   2 表示完成   3 表示删除   -1 表示查询全部
    //注意是异步查询，所以要等待数据的返回
    let list = await models.port.findAndCountAll({
        where,
        offset,
        limit
    })
    //console.log(list)
    res.json({
       list,
       message: "查询成功"
   })
})

app.post('/create', async (req, res, next)=> {
    try {
        let {name, deadline, content } = req.body;
        // 在数据库中create
        let result = await models.port.create({
            name,
            deadline,
            content
        })
        res.json({
            result,
            message: "创建数据成功"
        })
    }catch (error){
        console.log(err)
        rep.json({
            messgae: "添加失败"
        })
    }
   
})

app.post('/update', async (request, response)=>{
    let {name, deadline, content, id} = request.body;
    let result = await models.port.findOne({
        where: {
            id
        }
    })
    if (!result) {
        response.json({
            message:"查找的ID不存在"
        })
    }else {
        result.update({
            name,
            deadline,
            content
        })
        response.json({
            result
        })
    }
})

app.use((err, req, res, next)=>{
    if (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

app.listen(8000,'0.0.0.0', ()=>{
    console.log('服务启动...........')
})