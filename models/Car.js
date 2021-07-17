const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    VIN: {
        type: String,
        minlength:17,
        maxlength:17,
        required: [true, 'Please add a VIN']
    },
    year: {
        type: Number,
        required: [true, 'Please add a year'],
        minlength: 4,
        maxlength:4
    },
    mileage: {
        type: Number,
        required: [true, 'Please add a mileage'],
    },
    PN: {
        type: Number,
        required: [true, 'Please add a PN'],
    },
    countNumber: {
        type: String,
        minlength:5,
        maxlength:5,
        required: [true, 'Please add a Count Number'],
    },
    quantity: {
        type: Number,
        required: [true, 'Please add a Quantity'],
    },
    transmission:{
        type: String,
        enum: ['AUTOMATIC', 'MANUAL'],
    },
    company: {
        type: mongoose.Schema.ObjectId,
        ref: 'Company',
        required: true
    }
});

module.exports = mongoose.model('Car', CarSchema);
