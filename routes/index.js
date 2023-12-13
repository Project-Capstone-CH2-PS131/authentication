const express = require('express');
const router = express.Router();

router.get('/', function (_, res) {
  return res.status(200)
    .json({
      'error': false,
      'message': 'Service Running',
    })
    .end();
});

module.exports = router;
