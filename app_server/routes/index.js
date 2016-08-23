var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlVolunteers = require('../controllers/volunteers');

/* GET home page. */
router.get('/', ctrlMain.index );

/* Volunteers pages */
router.get('/volunteers/', ctrlVolunteers.getVolunteerList);
router.get('/volunteers/new', ctrlVolunteers.addVolunteer);
router.post('/volunteers/new', ctrlVolunteers.doAddVolunteer);


module.exports = router;
