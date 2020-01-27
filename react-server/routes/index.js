var express = require('express');
var router = express.Router();
var Person = require('../models/person')

/* GET home page. */
router.get('/', function (req, res, next) {
  // var person = new Person({
  //   name: 'ishant'
  // })
  person.save()
  res.json({
    "test": "initial setup done"
  })
});

module.exports = router;