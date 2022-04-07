/*jest最简例子
test('1+1===2', () => { //test关键字代表这是个测试用例，参数1：'1+1===2'是测试用例的描述；参数2：callback是测试的执行逻辑
  expect(1 + 1).toBe(2);
});
*/
const supertest = require('supertest'); //用于测试每条endpoint
const app = require('../../src/app');
const { connectToDB } = require('../../src/utils/db');

const request = supertest(app); //把api server传给supertest，生成一个client

//it关键字<=>test关键字，it should...是一个句子，所以偏向于使用it，
it('should return 201 if request is valid', async () => { //request发出请求是异步的，因此是async
  connectToDB(); //连接api server和mongodb server
  //添加一个student，send()里面是body的内容
  const res = await request
    .post('/api/students')
    .send({ firstName: 'aaa', lastName: 'bbb', email: 'test@gmail.com' });
  expect(res.statusCode).toBe(201);
});