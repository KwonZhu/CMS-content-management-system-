require('dotenv').config();
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const { connectToDB } = require('./utils/db');
const logger = require('./utils/logger');
const PORT = process.env.PORT || 3000;
const app = express();

const morganLog = process.env.NODE_ENV === 'production' ? morgan('common') : morgan('dev');
app.use(morganLog);
app.use(cors());
app.use(helmet());

app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

connectToDB(); //在listen之前连接MongoDB server

app.listen(PORT, () => {
  // logger.debug('debug output'); //做middleware的debug时的输出，用来检测request经过了哪些middleware
  logger.info(`server listening on ${PORT}`);
});