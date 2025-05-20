const express = require("express");
const staticRouter = express.Router();
const logger = require("../../logger/logger");
const { getImage } = require('../../services/public/image');

staticRouter.get("/image/avator/xiaoyuan", async (req, res) => {
  try {
    //const { imageName } = req.params;
    const { stream, mimeType } = await getImage("aichat/XiaoYuan.png"); // 这里的路径是相对于 storage/images 的路径

    // 设置响应头
    res.setHeader("Content-Type", mimeType);

    // 通过流的方式发送图片
    stream.pipe(res);

    // 错误处理
    stream.on("error", () => {
      res.status(500).send("内部服务器错误");
    });
  } catch (error) {
    res.status(404).send(error.message); // 如果图片不存在或发生其他错误
  }
});

staticRouter.use((req, res) => {
  res.status(404).json({ error: "aichat/static endpoint not found" });
});

module.exports = staticRouter;
