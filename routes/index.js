var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res
    .status(200)
    .json({
      'error': false,
      'message': 'service running',
    })
    .end();
});

module.exports = router;
