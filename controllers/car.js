const Car =require('../models/Car');
const axios=require('axios');

// @desc      Get All Cars
// @route     GET /car/get
// @access    Private
const getCars = async (req, res, next) => {
    try {
        const cars = await Car.find().populate('company');
        res.status(200).json(cars);
    } catch (e) {
        console.log(e.message)
    }
};

// @desc      Create Car
// @route     POST /car/create
// @access    Private
const createCar = async (req, res, next) => {
    req.body.company=req.params.companyId;
    const { VIN, year, mileage, PN, countNumber, quantity, transmission, company, vincode } = req.body;
    try{
    const response= await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vincode}?format=json`);
        if(response){
            const car = await Car.create({
                VIN,
                year,
                mileage,
                PN,
                countNumber,
                quantity,
                transmission,
                company
            });

            res.status(201).json(car);
        }
    }catch (e) {
        console.log(e.message)
    }
};

module.exports = { getCars, createCar }
