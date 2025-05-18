const express = require('express');
const preferenceRouter = express.Router();
const logger = require('../../logger/logger');


preferenceRouter.get('/markdown', async (req, res) => {
    
});

preferenceRouter.use((req, res) => {
    res.status(404).json({ error: 'preference endpoint not found' });
});

module.exports = preferenceRouter;