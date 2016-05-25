var express = require('express');
var router = express.Router();

/* ON-BOARDING SCREENS*/

router.get('/', function(req, res, next) {
  res.render('start/location', { title: 'Express' });
});

router.get('/location', function(req, res, next) {
  res.render('start/location', { title: 'Express' });
});

router.get('/three_things', function(req, res, next) {
  res.send('respond with a three_things');
});

router.get('/contact', function(req, res, next) {
  res.send('respond with a contact');
});

router.get('/about', function(req, res, next) {
  res.send('respond with a about');
});

module.exports = router;
