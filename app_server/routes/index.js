var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlVolunteers = require('../controllers/volunteers');
// var ctrlAdmins =
// var ctrlOpportunities =

/* GET home page. */
router.get('/', ctrlMain.index );

/* Volunteers pages */
router.get('/volunteers/register', ctrlVolunteers.register);
router.get('/volunteers/list', ctrlVolunteers.list);
router.get('/volunteers/view', ctrlVolunteers.view);
router.get('/volunteers/edit', ctrlVolunteers.edit);

module.exports = router;
