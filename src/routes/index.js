const express = require('express');
const router = express.Router();
const controller = require('../Controller/controllers');
const verifyToken = require('../helpers/verify_token');

router.get('/', (req, res) => {
    res.render('login');
})

router.get('/index',verifyToken, (req, res) => {
    res.render('index');
})

router.get('/signup', (req, res) => {
    res.send('signup');
})

router.post('/', controller.login)
router.post('/signup', controller.signup)

module.exports = router;