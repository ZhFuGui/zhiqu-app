const express = require('express');
const   saveRouter= express.Router();
const logger = require('../../logger/logger');
const AnalyzeService = require('../../services/analyze/analyze');

const analyzeService = new AnalyzeService();

saveRouter.post('/dialogue', async (req, res) => {
  res.status(250).json({ error: '开发中...' });
});

saveRouter.post('/question', async (req, res) => {
  res.status(250).json({ error: '开发中...' });
});

saveRouter.use((req, res) => {
    res.status(404).json({ error: 'aichat/save endpoint not found' });
});

module.exports = saveRouter;