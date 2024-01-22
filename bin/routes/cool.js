var express = require('express');
var router = express.Router();

/* GET cool message. */
router.get('/', function(req, res, next) {
    res.render('cool', { title: 'Cool' });
});

module.exports = router;
