/*jest最简例子
test('1+1===2', () => { //test关键字代表这是个测试用例，参数1：'1+1===2'是测试用例的描述；参数2：callback是测试的执行逻辑
  expect(1 + 1).toBe(2);
});
*/
const supertest = require('supertest'); //用于测试每条endpoint
const app = require('../../src/app');
const { connectToDB } = require('../../src/utils/db');
const Student = require('../../src/models/student');

const request = supertest(app); //把api server传给supertest，生成一个client

describe('/students', () => { //describe可以嵌套。用来整理测试用例
  describe('POST', () => {
    //it关键字<=>test关键字，it should...是一个句子，所以偏向于使用it，
    it('should return 201 if request is valid', async () => { //request发出请求是异步的，因此是async
      connectToDB(); //连接api server和mongodb server
      //添加一个student，send()里面是body的内容
      //在测试前和测试后，保证数据库空白，使得测试用例互不干扰 => 使用测试专用的db。注意：不是指新的db server，而是新的db
      const res = await request
        .post('/api/students')
        .send({ firstName: 'aaa', lastName: 'bbb', email: 'test@gmail.com' });
      expect(res.statusCode).toBe(201);
    });
    //通过npm run test:watch得到201，但不确定数据是否已存到db
    //验证：绕过api server，用mongoose直接与mongodb server连接并发送请求取数据
    it('should save student to database if request is valid', async () => { //request发出请求是异步的，因此是async
      connectToDB();
      await request //不再需要知道具体结果，即不需要res
        .post('/api/students')
        .send({ firstName: 'aaa', lastName: 'bbb', email: 'test@gmail.com' });
      //直接把这个student从db找出
      const student = await Student.findOne({ email: 'test@gmail.com'});
      expect(student.firstName).toBe('aaa');
      expect(student.lastName).toBe('bbb');
    });
  })
})

