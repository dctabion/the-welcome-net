var express = require('express');
var router = express.Router();
var ctrVolunteers = require('../controllers/volunteers');

router.get('/volunteers', ctrVolunteers.volunteerList);

module.exports = router;
