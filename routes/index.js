var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Moodslider' });
});

router.get("/upload", function(req, res, next) {
    res.render('upload', { title: 'Moodslider' });
});

module.exports = router;
