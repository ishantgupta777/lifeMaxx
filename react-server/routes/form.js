var express = require('express');
var router = express.Router();
var Person = require('../models/person')
var parser = require('../utils/cloudinaryMulter').parser

/* Post Safe Person Form */
router.post('/form', parser.single('image'), async function (req, res, next) {

  try {
    const form = JSON.parse(JSON.stringify(req.body))
    if (form.lastLocationLat) {
      form.lastLocation = [parseFloat(form.lastLocationLat), parseFloat(form.lastLocationLong)]
      delete form.lastLocationLat
      delete form.lastLocationLong
    }
    let person = new Person(form)
    if (req.file)
      person = new Person({
        ...form,
        image: req.file.url
      })
    await person.save()

    res.status(200).send(req.file)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
});

router.get('/', function (req, res, next) {
  // var person = new Person({
  //   name: 'ishant'
  // })
  // person.save()
  res.json({
    "test": "initial setup done"
  })
});

module.exports = router;