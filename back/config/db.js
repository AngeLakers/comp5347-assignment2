// 新建config/db.js
/**
 * 数据库连接
 */
const mongoose = require('mongoose')
const config = require('./dev')
const prod = require('./prod')
const log4js = require('../utils/log4js')

if (process.env.NODE_ENV === 'development') {
    mongoose.connect(config.URL)
} else {
    mongoose.connect(prod.URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: prod.user,
        pass: prod.pass
    })

}
const db = mongoose.connection;

db.on('error', () => {
    log4js.error('***数据库连接失败***')
})

db.on('open', () => {
    log4js.info('***数据库连接成功***')
})