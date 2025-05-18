const express = require('express');
const preferenceRouter = require('./preference');
const logger = require('../../logger/logger');
const analyzeRouter = express.Router();


analyzeRouter.use('/preference', preferenceRouter);


analyzeRouter.use((req, res) => {
  res.status(404).json({ error: 'analyze endpoint not found' });
});

module.exports = analyzeRouter;