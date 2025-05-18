const express = require('express');
const docsRouter = express.Router();
const DocsService = require('../../services/library/docs');
const logger = require('../../logger/logger');

const docsService = new DocsService();

docsRouter.get('/json', async (req, res) => {
    const result = await docsService.readJsonFile();
    if (result.error) {
        logger.error(result.error);
        return res.status(500).send(result.error.includes('JSON') ? 'JSON 格式错误' : '无法读取文件');
    }
    res.json(result.data);
});

docsRouter.use((req, res) => {
    res.status(404).json({ error: 'docs endpoint not found' });
});

module.exports = docsRouter;