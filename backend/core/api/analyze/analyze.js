const express = require('express');

const analyzeRouter = express.Router();


analyzeRouter.use((req, res) => {
  res.status(404).json({ error: 'analyze endpoint not found' });
});

module.exports = analyzeRouter;