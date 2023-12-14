const mongoose = require('mongoose');
const validator = require('validator'); // Import the validator library

const Schema = mongoose.Schema;

// RESERVATION SCHEMA 
let Reservation = new Schema({
    dateTime: {
        type: String
    },
    guestNum: {
        type: Number
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    contact: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'Invalid email address'] // Email validation
    }
});

module.exports = mongoose.model('Reservation', Reservation);
