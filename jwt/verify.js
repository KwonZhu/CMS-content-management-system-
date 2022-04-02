//用于验证token是否由本server签发
const jwt = require('jsonwebtoken');

const secret = 'secret';

//直接把sign.js生成的token贴过来
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNCwiaWF0IjoxNjQ4ODE0MDIwLCJleHAiOjE2NDg5MDA0MjB9.AfCHYr5XQrmWiyq26qnl3iah2zjKMfvDVwW_qjAApaw'

const valid = jwt.verify(token, secret);

console.log(valid);