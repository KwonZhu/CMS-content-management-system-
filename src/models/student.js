const { Schema, model } = require('mongoose');
const Joi = require('joi'); //导入的变量uppercase/lowercase，查看该package的readme看如何导入

const schema = new Schema({
  firstName: { 
    type: String,
    require: true,
    trim: true, //delete extra spaces
    minlength: 2,
  },
  lastName: { 
    type: String,
    require: true,
    trim: true
  },
  email: { 
    type: String,
    require: true,
    validate: {
      validator: (email) => { //调用一个callback function来检测数据
                              //接收用户传来的field作为参数
        return !Joi.string().email().validate(email).error;
        //Jio.string().email().validate()返回一个object，object.error有值，则不为undefined，即校验失败
        //没有值，undefined，校验成功

        /*
        上面一行代码<=>
        const validation = Joi.string().email().validate(email);
        const {error} = validation;
        if (error) {
          return false;
        }
        return true;
        */
      },
      msg: 'Invalid email format' //validator不通过时返回的信息
    }
  },
  // course: {
  //   type: String
  // }
});
module.exports = model('Student', schema);