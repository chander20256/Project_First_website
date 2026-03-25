const express = require('express');
const router = express.Router();
const { addSurvey, getSurveys } = require('../Controllers/surveyController');

// POST request survey add karne ke liye, GET request fetch karne ke liye
router.post('/add', addSurvey);
router.get('/all', getSurveys);

module.exports = router;