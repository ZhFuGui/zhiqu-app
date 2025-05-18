const express = require('express');
const apiRouter = express.Router();
const libraryRouter = require('./library/library');
const analyzeRouter = require('./analyze/analyze');

// 记录所有请求
apiRouter.use((req, res, next) => {
  next();
});

// 挂载 API 路由
apiRouter.use('/library', libraryRouter);
apiRouter.use('/analyze', analyzeRouter);

// 404 处理
apiRouter.use((req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

module.exports = apiRouter;