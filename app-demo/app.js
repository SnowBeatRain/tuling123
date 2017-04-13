/**
 * 在require('模块名') 的时候首先会查找nodejs内置的模块,
 *  如果没有找到再去当前项目中的node_modules文件夹下查找
 * require('路径+文件名') //可以引入一个自己写的模块文件
 */
var express = require('express')//引入express模块
var app = express()

//引入body-parser
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

var fs = require('fs') //引入fs(file-system文件系统)模块

//允许跨域访问
app.all('/api/*',function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",'4.15.2')
    res.header("Content-Type", "application/json;charset=utf-8");
    next()
})

app.get('/api/v1/all',function(req,res){
    var strFileData = fs.readFileSync('./data.json').toString()
    res.json({
        status:'y',
        msg:'获取数据成功',
        data:JSON.parse(strFileData)
    })
})

// app.use(express.static('public'))
app.post('/api/v1/sub',function(req,res){
    console.log(req.body)
    //fs.readFileSync('文件名') 同步方式读取文件内容
    var strFileData = fs.readFileSync('./data.json').toString()
    var arrData = []//存储数据的数组
    if(strFileData){
        arrData = JSON.parse(strFileData)//把文件中原有的数据保存在数组中
    }
    arrData.push(req.body)
    /**
     * fs.writeFile 写文件
     *  参数一 文件名(保存内容的文件名)
     *  参数二 内容(需要写入文件的内容 是一个字符串)
     *  参数三 回调函数(写文件完毕之后的回调函数,接收一个参数(错误信息,如果不报错就为null))
     */
    fs.writeFile('./data.json',JSON.stringify(arrData),function(err){
        if(err){
            console.log(err)
        }
        else{
            console.log('保存数据成功')
        }
    })
    //res.json 返回一个json数据,传入的参数为一个js对象
    res.json({
        status:'y',
        msg:'提交成功'
    })
})
app.listen(3000,function(){
    console.log('server is running...')
})