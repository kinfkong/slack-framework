var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/slash', function(req, res, next) {
  console.log(req.body);
  res.json({text: 'kk is handsome!'});
});

module.exports = router;
