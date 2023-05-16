var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var goodsRouter = require('./routes/goods');
var  serverRouter = require('./routes/server');
const cors = require('cors');
const bodyParser = require('body-parser');
var app = express();
// 跨域
app.use(cors());
app.all('*',function(req,res,next){//这里是设置请求头设置为可以跨域  不懂的朋友可以看看ajax的同源策略
  res.header('Access-Control-Allow-Origin','*');//*表示可以跨域任何域名都行（包括直接存在本地的html文件）出于安全考虑最好只设置 你信任的来源也可以填域名表示只接受某个域名
  // res.header('Access-Control-Allow-Headers','X-Requested-With,Content-Type');//可以支持的消息首部列表
  res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');//可以支持的提交方式
  // res.header('Content-Type','application/json;charset=utf-8');//响应头中定义的类型
  next();
});
// 静态文件
app.use('/static',express.static(path.join(__dirname, 'public')));
// 解析 application/json 类型的请求体
app.use(bodyParser.json({ limit: '10mb', extended: true }));
// 解析 application/x-www-form-urlencoded 类型的请求体
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// 封装的响应成功和失败
app.use((req, res, next) => {
  try {
    res.success = function(data,code=0) {
      res.json({
        success: true,
        data: data,
        code:code
      });
    };
    res.fail = function(message, code = -1) {
      res.status(200).json({
        success: false,
        message: message,
        code: code
      });
    };
  
    next();
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message
    });
  }
 
 
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 路由中间件
app.use('/api/goods',goodsRouter);
app.use(serverRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
