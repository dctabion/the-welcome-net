var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlVolunteers = require('../controllers/volunteers');
var ctrlDeveloper = require('../controllers/developer');

/* GET home page. */
router.get('/', ctrlMain.index );

/* Volunteers pages */
router.get('/volunteers/', ctrlVolunteers.getVolunteerList);
// router.get('/volunteers/:subscribers', ctrlVolunteers.getVolunteerList);
router.get('/volunteers/new', ctrlVolunteers.addVolunteer);
router.post('/volunteers/new', ctrlVolunteers.doAddVolunteer);

/* Developer routes */
router.get('/developer/reconfigure', ctrlDeveloper.doReconfig);

/* Easter Egg */
router.get('/princess', ctrlVolunteers.getPrincess);

module.exports = router;
