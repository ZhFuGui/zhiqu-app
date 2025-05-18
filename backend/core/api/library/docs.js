const express = require('express');
const docsRouter = express.Router();
const fs = require('fs');
const path = require('path');
const logger = require('../../logger/logger');


docsRouter.get('/json', (req, res) => {

    const filePath = path.join(__dirname, '../../../storage/static', 'example.json');
    // 异步读取文件内容
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            const errorMessage = `读取文件 ${filePath} 失败: ${err.message}`;
            logger.error(errorMessage);
            return res.status(500).send('无法读取文件');
        }

        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData); // 发送 JSON 响应
        } catch (parseErr) {
            const errorMessage = `JSON 解析错误: ${parseErr.message}`;
            logger.error(errorMessage);
            res.status(500).send('JSON 格式错误');
        }
    });
});

docsRouter.use((req, res) => {
    res.status(404).json({ error: 'docs endpoint not found' });
});

module.exports = docsRouter;