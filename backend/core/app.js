const express = require('express');
const logger = require('./logger/logger');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const app = express();
app.use(express.json());
const apiRouter = require('./analyze/analyze');

// 初始化日志
logger.init().then(() => {
  console.log('Logger initialized');
});

// 记录所有请求
app.use((req, res, next) => {
  const data = `${req.ip} ${req.method} ${req.url} `;
  logger.access(data);
  next();
});


// 挂载所有 API 路由
app.use('/api', apiRouter);


const PORT = process.env.PORT || 13100;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});