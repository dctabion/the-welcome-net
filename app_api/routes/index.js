var express = require('express');
var router = express.Router();
var ctrlVolunteers = require('../controllers/volunteers');
var ctrlOptions = require('../controllers/options');

router.post('/volunteers', ctrlVolunteers.volunteersCreate);
router.get('/volunteers', ctrlVolunteers.volunteersList);
router.get('/volunteers/:volunteerId', ctrlVolunteers.volunteersReadOne);
router.put('/volunteers/:volunteerId', ctrlVolunteers.volunteersEditOne);

router.get('/config', ctrlOptions.readAppConfig);
router.post('/config/languages/new/:language', ctrlOptions.addNewLanguage);
router.post('/config/affiliations/new/:affiliation', ctrlOptions.addNewAffiliation);
router.post('/config/opportunity_categories/new/:opportunity_category', ctrlOptions.addNewOpportunity);

// router.post('/config/affiliation/new/:affiliation', ctrOptions.doodicus);

module.exports = router;
