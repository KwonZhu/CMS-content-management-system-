const Student = require('../models/student');

async function getAllStudents(req, res) {
  const students = await Student.find().exec();
  return res.json(students); 
}

async function getStudentById(req, res) {
  const { id } = req.params;
  const student = await Student.findById(id).exec();
  if (!student) {
    return res.sendStatus(404);
  }
  return res.json(student);
}

async function updateStudentById(req, res) {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  const student = await Student.findByIdAndUpdate(
    id, 
    { firstName, lastName, email }, 
    {new: true}
  ).exec();
  if (!student) {
    return res.sendStatus(404);
  }
  return res.json(student);

}

async function deleteStudentById(req, res) {
  const { id } = req.params;
  const student = await Student.findByIdAndDelete(id).exec();
  if (!student) {
    return res.sendStatus(404);
  }
  return res.sendStatus(204);
  //return res.json(student);

}

async function createStudent(req, res) {
  const { firstName, lastName, email } = req.body;
  const student = new Student({ firstName, lastName, email });
  await student.save(); //打开try-catch的话，这行要comment掉
  //以下是3种抓取错误的方式
  /*
  将async await中不符合student.js里schema验证的错误信息捉取且返回到postman上
  try {
    await student.save();
  } catch (e) {
    return res.send(e);
  }
  */
  /*
  第二种：类似于try-catch的较旧写法
  student.save((error, result) => {
    if (error) {
      return next(e); //这里做错误处理不直接return，而是将错误丢到errorhandler处理
                      //即async function createStudent(req, res, next){}的第三个参数
    }
    return res.status(201).json(result); //这种写法comment掉return res.status(201).json(student);
  });  
  */
  /*
  第三种：用promise的方式
  student.save().then((result) => {
    return res.status(201).json(result); //如果成功获取到数据
  }).catch(error => { 
    next(error);
  });  
  */

  //对于任何一个async await的地方(上面5个functions)，都需要使用try-catch
  //这个.save()可被替换成.findByIdAndDelete(), .findByIdAndUpdate(), .findById(), .find()
  //=>这样很繁琐

  return res.status(201).json(student);
}

module.exports = {
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  createStudent
}