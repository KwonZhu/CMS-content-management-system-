const Course = require('../models/Course');

async function getAllCourses(req, res) { //await前要加async
  //新项目写法：async await
  const courses = await Course.find().exec(); 
    //Course.find()是异步操作，会返回一个promise。因此要创建一个变量
      //语法类似于在mongodb shell里的db.collections.find()
    //.exec()表示：代码执行到此时，查询操作(query)在这里就中止，因为query可以promise那样chain起来
      //因此，如果query结束的话就加上.exec()，代表后面的代码没有query了，也防止后面的代码改动这个query

  //旧项目写法: promise
  //Course.findById().then().catch()
  //更旧的写法: call back
  //Course.findById((error, data) => {})
  return res.json(courses);
}

function getCourseById(req, res) {

}

function updateCourseById(req, res) {

}

function deleteCourseById(req, res) {
  
}

function createCourse(req, res) { 
  //需要从body取数据
  const { _id, name, description } = req.body;
  //validate data

  //创建一个新document
  const course = new Course({ _id, name, description }); //Course是model(collection), course是document
    //从body把field取出来，又原封不动地添加到创建新course
    //在updateCourse也会做同样的操作
    //原因:controller不需要req.body里所有的数据，只需要这个controller关心的数据。
    //而且validate data时也是需要从req.body里取数据的，所以精确地取就是了
    //不建议写const course = new Course(req.body)，因为这样能篡改Course这个model里的其他field，譬如fee从1000改成0

  await course.save(); //通过调用save()，帮助存到MongoDB，具体是存到哪个数据库(database server里有很多databases)的哪个collection由schema定义 
                       //save()没有.exec()
  return res.status(201).json(course); //返回201，返回刚创建好的course
}

module.exports = {
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  createCourse
}