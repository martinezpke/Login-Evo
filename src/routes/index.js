const express = require('express');
const router = express.Router();
const controller = require('../Controller/controllers');
const verifyToken = require('../helpers/verify_token');

router.get('/', (req, res) => {
    res.render('login');
})

router.get('/index',verifyToken, (req, res) => {
    res.send('Bienvenido');
})

router.get('/test', verifyToken, (req, res) => {
    res.send('text');
})

router.post('/', controller.login)

module.exports = router;