var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlVolunteers = require('../controllers/volunteers');
var ctrlAdmin = require('../controllers/admin');
var ctrlDeveloper = require('../controllers/developer');
/* GET home page. */
router.get('/', ctrlMain.index );

/* VOLUNTEER ROUTES */
router.get('/volunteers-hidden/', ctrlVolunteers.getVolunteerList);
router.get('/volunteers/new', ctrlVolunteers.addVolunteer);
router.post('/volunteers/new', ctrlVolunteers.doAddVolunteer);
router.get('/volunteers/edit/:id', ctrlVolunteers.editVolunteer);
router.post('/volunteers/edit/:id', ctrlVolunteers.doEditVolunteer);
router.get('/volunteers/:id', ctrlVolunteers.viewVolunteer);
router.get('/volunteers/delete/:id', ctrlVolunteers.deleteVolunteer);

/* ADMIN ROUTES */
router.get('/admin/', ctrlAdmin.index);


/* DEVELOPER ROUTES */
router.get('/developer/reconfigure', ctrlDeveloper.doReconfig);
router.get('/developer/dump/config', ctrlDeveloper.doDumpConfig);
router.get('/developer/dump/volunteers', ctrlDeveloper.doDumpVolunteers);
router.get('/developer/sendmail', ctrlVolunteers.sendmail);


/* Easter Egg */
router.get('/princess', ctrlVolunteers.getPrincess);

module.exports = router;
