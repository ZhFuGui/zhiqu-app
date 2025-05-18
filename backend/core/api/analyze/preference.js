const express = require('express');
const preferenceRouter = express.Router();
const logger = require('../../logger/logger');
const AnalyzeService = require('../../services/analyze/analyze');

const analyzeService = new AnalyzeService();

preferenceRouter.post('/markdown', async (req, res) => {
  try {
    const { history } = req.body;

    if (typeof history !== 'string') {
      return res.status(400).json({ error: 'Invalid input: history must be a string' });
    }

    // 调用服务层函数
    const result = await analyzeService.preference(history);

    // 返回结果给前端
    res.json({ success: true, data: result });

  } catch (error) {
    console.error('Error in /preference/markdown:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

preferenceRouter.use((req, res) => {
    res.status(404).json({ error: 'preference endpoint not found' });
});

module.exports = preferenceRouter;