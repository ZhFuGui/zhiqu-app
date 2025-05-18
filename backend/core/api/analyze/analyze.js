const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../../.env') });

const analyzeRouter = express.Router();


analyzeRouter.use((req, res) => {
  res.status(404).json({ error: 'analyze endpoint not found' });
});

module.exports = analyzeRouter;