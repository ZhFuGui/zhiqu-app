const express = require('express');
const docsRouter = require('./docs');
const libraryRouter = express.Router();

libraryRouter.use('/docs', docsRouter);

libraryRouter.use((req, res) => {
  res.status(404).json({ error: 'library endpoint not found' });
});

module.exports = libraryRouter;