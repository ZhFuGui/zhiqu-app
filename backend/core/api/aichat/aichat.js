const express = require('express');
const saveRouter = require('./save');
const staticRouter = require('./static');
const logger = require('../../logger/logger');
const aichatRouter = express.Router();


aichatRouter.use('/save', saveRouter);
aichatRouter.use('/static', staticRouter);

aichatRouter.use((req, res) => {
  res.status(404).json({ error: 'aichat endpoint not found' });
});

module.exports = aichatRouter;