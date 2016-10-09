var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlVolunteers = require('../controllers/volunteers');
var ctrlAdmin = require('../controllers/admin');
var ctrlDeveloper = require('../controllers/developer');
/* GET home page. */
router.get('/', ctrlMain.index );

/* VOLUNTEER ROUTES */
router.get('/volunteers/', ctrlVolunteers.getVolunteerList);
// router.get('/volunteers/:subscribers', ctrlVolunteers.getVolunteerList);
router.get('/volunteers/new', ctrlVolunteers.addVolunteer);
router.post('/volunteers/new', ctrlVolunteers.doAddVolunteer);
router.get('/volunteers/edit/:id', ctrlVolunteers.editVolunteer);

/* ADMIN ROUTES */
router.get('/admin/', ctrlAdmin.index);


/* DEVELOPER ROUTES */
router.get('/developer/reconfigure', ctrlDeveloper.doReconfig);
// router.get('/developer/dump_config'), ctrlDeveloper.doDumpConifg);



/* Easter Egg */
router.get('/princess', ctrlVolunteers.getPrincess);

module.exports = router;
