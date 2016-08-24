var express = require('express');
var router = express.Router();
var ctrVolunteers = require('../controllers/volunteers');
var ctrOptions = require('../controllers/options');

router.post('/volunteers', ctrVolunteers.volunteersCreate);
router.get('/volunteers', ctrVolunteers.volunteersList);
router.get('/volunteers/:volunteerid', ctrVolunteers.volunteersReadOne);

router.post('/config/language/:language', ctrOptions.addNewLanguage);
module.exports = router;
