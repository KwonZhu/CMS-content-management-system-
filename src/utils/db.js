// 用来连接api server和mongodb server
const mongoose = require('mongoose');

exports.connectToDB = () => { //直接把整个尝试连接的过程封装起来后export
  // .env 
  // DB_HOST=localhost
  // DB_PORT=27017
  // DB_DATABASE=CMS
  const connectionString = process.env.CONNECTION_STRING; ////mongodb://localhost:27017/dbName(CMS)

  //监听连接状态: 1. 连接成功；2. 断开连接；3. 错误
  const db = mongoose.connection; //连接成功
  db.on('connected', () => {
    console.log(`DB connected with: ${connectionString}`);
  });
  db.on('error', (error) => { //连接中途断开/连接失败
    console.log(`DB connection failed: ${error.message}`);
    process.exit(1); //关闭当前server
    //3种关闭
      //正常关闭 -> 程序运行结束
      //非正常关闭 -> 没有预计到的错误
      //人为关闭
        //人为正常关闭 process.exit(0) 
        //人为非正常关闭 process.exit(非零的任何数)
      
    //通常会在process外面套一个监控process，它能查看process退出时的状态码来判定正常/非正常关闭
  });
  db.on('disconnected', () => {
    console.log('disconnected');
  });
  
  mongoose.connect(connectionString, { //执行到这行表示api server尝试与MongoDB server请求连接
    useNewUrlParser: true, //这两个参数用来解决命令行的warning信息
    useUnifiedTopology: true
  },); 
}