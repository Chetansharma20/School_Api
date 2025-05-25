
const express = require('express');
const router = express.Router();
// const schoolController = require('../controllers/schoolController');
const { addSchool, ListSchools } = require('../controller/SchoolController');

// Routes
router.post('/addSchool', addSchool);
router.get('/listSchools', ListSchools);

module.exports = router;
