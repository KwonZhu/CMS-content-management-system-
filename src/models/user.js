const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new Schema({
  username: {
    type: String,
    require: true,
    trim: true,
    minlength: 2
  },
  password: {
    type: String,
    require: true,
    trim: true
  }
});
//mongoose可自定义函数
//static method -> 作用于Model，Model.functionName调用
//instance method -> 作用于document，document.functionName调用
//instance method format: schema.methods.functionName
schema.methods.hashPassword = async function() { //use hash to hash the document's plaintext password
                                                 //anonymous function，因为暂时还不知道具体是哪个document
  //this指向具体的document
  this.password = await bcrypt.hash(this.password, 12); 
  //参数1是要存的password，12表示hash12次，次数越多越难破解，目前的计算能力是12
}
//validate the input password
schema.methods.validatePassword = async function(password) {
  return bcrypt.compare(password, this.password); //参数1：输入的密码，参数2：密文存储的密码
                                                  //hash(input password + salt)*12 VS document's password
  //如果password一样，会返回false
}

module.exports = model('User', schema);