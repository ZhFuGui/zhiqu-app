const express = require("express");
const logger = require("./logger/logger");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });
const app = express();
app.use(express.json());
const apiRouter = require("./api/api");

// 初始化日志
logger.init().then(() => {
  console.log("Logger 已经初始化");
});

// 记录所有请求
app.use((req, res, next) => {
  const data = `${req.ip} ${req.method} ${req.url} `;
  logger.access(data);
  next();
});

// 挂载所有 API 路由
app.use("/api", apiRouter);

const PORT = process.env.PORT;

if (!PORT) {
  logger.error(`没有找到指定 PORT`).then(() => {
    process.exit(1);
  })
}

const server = app.listen(PORT, () => {
  logger.info(`服务器启动成功，监听端口: ${PORT}`);
});

server.on('error', async (err) => {
  if (err.code === 'EADDRINUSE') {
    await logger.error(`端口 ${PORT} 已经被占用`);
  } else {
    await logger.error(`服务器启动失败:  ${err.message}`);
  }
  process.exit(1);
});