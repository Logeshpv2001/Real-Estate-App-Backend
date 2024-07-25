// routes/agentRoutes.js
const express = require('express');
const { registerAgent, loginAgent } = require('../controllers/agentController');
const router = express.Router();

router.post('/api/agents/register', registerAgent);
router.post('/login', loginAgent);

module.exports = router;