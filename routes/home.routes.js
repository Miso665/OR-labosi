const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('home', {
        title: 'Main page',
        linkActive: 'home'
    });
});

module.exports = router;