const Company = require('../models/Company');

// @desc      Get All Companies
// @route     GET /company/get
// @access    Private
const getCompanies = async (req, res, next) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (e) {
        console.log(e.message)
    }
};

// @desc      Create Company
// @route     POST /company/create
// @access    Private
const createCompany = async (req, res, next) => {
    const {name} = req.body;

    const company = await Company.create({
        name
    });

    res.status(201).json(company);
};

module.exports = { createCompany, getCompanies }
