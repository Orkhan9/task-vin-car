const express = require('express');
const { createCompany , getCompanies } = require('../controllers/company');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/create',protect, createCompany);
router.get('/get', getCompanies);

module.exports = router;
