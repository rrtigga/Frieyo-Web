var express = require('express');
var router = express.Router();

/* ON-BOARDING SCREENS*/

router.get('/', function(req, res, next) {
  res.render('start/location', { title: 'Express' });
});

router.get('/location', function(req, res, next) {
  res.render('start/location', { title: 'Express' });
});

router.get('/interests', function(req, res, next) {
  res.render('start/interests', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  res.send('respond with a contact');
});

router.get('/about', function(req, res, next) {
  res.send('respond with a about');
});

module.exports = router;
