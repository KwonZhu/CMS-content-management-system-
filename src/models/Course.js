// const mongoose = require('mongoose');
// const schema = new mongoose.Schema({}) //用mongoose创建schema
// 做destruction
const {Schema, model} = require('mongoose');
const schema = new Schema({
  // 传入一个object，定义这个document有哪些fields, field分别是什么类型
  _id: {
    type: String, //把_id的Object类型改成String
                  //使得_id存储的是course code，而不是Object类型的那一串10几个的字符
    uppercase: true //自动转换为大写
  },
  name: {
    type: String,
    require: true, //必须要传name
  },
  description: {
    type: String,
    default: 'This is a description' //当创建document没传description时
  }
});

//让_id = course code的方法
//对这个schema创建虚拟field - code，code在获取值时，获取_id的值
schema.virtual('code').get(function() { //注意，这里没有写箭头函数，而是anonymous function，因为使用了this，
                                        //使得指向实际的document
  return this._id;
});

module.exports = model('Course', schema); //第1个参数：model的名字为Course，C大写
                                            //Course的用处: 
                                              //1. Course -> courses，数据库里的collection是courses
                                              //2. 把Course的model注册到mongoose
                                                //如果想在其他地方使用这个model，直接导入即可
                                                //在mongoose里通过model的名字直接找到这个model
                                          //第2个参数：model的schema是什么