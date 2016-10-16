var express = require('express');
var router = express.Router();
var ctrVolunteers = require('../controllers/volunteers');
var ctrOptions = require('../controllers/options');

router.post('/volunteers', ctrVolunteers.volunteersCreate);
router.get('/volunteers', ctrVolunteers.volunteersList);
router.get('/volunteers/:volunteerId', ctrVolunteers.volunteersReadOne);
router.put('/volunteers/:volunteerId', ctrVolunteers.volunteersEditOne);

router.get('/config', ctrOptions.readAppConfig);
router.post('/config/language/new/:language', ctrOptions.addNewLanguage);
router.post('/config/affiliation/new/:affiliation', ctrOptions.addNewAffiliation);
// router.post('/config/affiliation/new/:affiliation', ctrOptions.doodicus);

module.exports = router;
