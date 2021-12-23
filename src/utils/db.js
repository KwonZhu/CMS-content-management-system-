// 用来连接api server和mongodb server
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CMS'); //connection string:mongodb://localhost:27017 + dbName