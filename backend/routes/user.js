const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');
console.log("je suis dans mes routes user");

router.post('/signup', userCtrl.signup);

router.post('/login', userCtrl.login);

module.exports = router;