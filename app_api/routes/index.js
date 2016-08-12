var express = require('express');
var router = express.Router();
var ctrVolunteers = require('../controllers/volunteers');

router.post('/volunteers', ctrVolunteers.volunteersCreate);
router.get('/volunteers', ctrVolunteers.volunteersListAll);
router.get('/volunteers/:volunteerid', ctrVolunteers.volunteersReadOne)
module.exports = router;
