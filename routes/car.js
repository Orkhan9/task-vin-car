const express = require('express');
const { getCars,createCar } = require('../controllers/car');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/:companyId/create',protect, createCar);
router.get('/',protect, getCars);

module.exports = router;
