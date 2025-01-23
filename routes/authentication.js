const express = require('express');
const router = express.Router();
const LoginService = require('../services/login');
const SignupService = require('../services/sign_up');

router.get('/login', async (req, res, next) => {
    try {
        const token = await LoginService.login(req.body);
        res.status(200).json(token);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
    res.send('welcome');
});

router.post('/signup', async (req, res) => {
    try {
        const user = await SignupService.signup(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    res.send('account created please verify your email');
});

module.exports = router;