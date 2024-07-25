// controllers/agentController.js
const Agent = require('../models/agentModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerAgent = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingAgent = await Agent.findOne({ email });
        if (existingAgent) {
            return res.status(400).json({ message: 'Agent already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const agent = new Agent({ name, email, password: hashedPassword });
        await agent.save();
        res.status(201).json({ message: 'Agent registered' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.loginAgent = async (req, res) => {
    const { email, password } = req.body;
    try {
        const agent = await Agent.findOne({ email });
        if (!agent || !(await bcrypt.compare(password, agent.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: agent._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};