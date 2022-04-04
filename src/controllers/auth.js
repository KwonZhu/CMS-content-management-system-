// 根据个人习惯，用户登录可写在controllers/auth.js，也可以写在controllers/users.js
const User = require('../models/user');
const { generateToken } = require('../utils/jwt');

async function login(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec(); //不像addUser那样用findOne()来检测是否存在，而是取出这个user
  if (!user) {
    return res.status(404).json('username not found');
  }
  //fail fast写法，直接把错误抛出返回，不执行后续代码
  /*如果用成功做case，就会是if嵌套模式，即，如果user存在，如果密码匹配...
  这样不好读，也不好做测试
  if () {
    if () {
      if () {

      }
    }
  }
  */
  if (user.password !== password) {
    return res.status(401).json('Invalid username or password');
  }
  const token = generateToken({ id: user._id });
  return res.json({ token, username }); //<=>return res.status(200).json(token)，返回200可以省略不写
}

module.exports = { login };
