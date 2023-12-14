const Reservation = require('../models/ReservationModel');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

exports.createReservation = async (req, res) => {
    try {
        const newReservation = new Reservation(req.body);
        await newReservation.save();
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getReservationByEmail = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!!token) {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode)
            const user = await User.findById(decoded.id);
            if(user?.userRole === 1) {
                const reservation = await Reservation.find();
                if (!reservation) {
                    return res.status(404).json({ message: 'Reservation not found' });
                }
                res.json(reservation);
            } 
        } else {
            const reservation = await Reservation.findOne({ email: req.params.email });
            if (!reservation) {
                return res.status(404).json({ message: 'Reservation not found' });
            }
            res.json(reservation);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// exports.createReservation = async (req, res) => {
//     try {
//         const newReservation = new Reservation(req.body);
//         await newReservation.save();
//         res.status(201).json(newReservation);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

exports.getReservationByEmail = async (req, res) => {
    try {
        if(req.params.email === "admin@gmail.com") {
            const reservation = await Reservation.find();
            if (!reservation) {
                return res.status(404).json({ message: 'Reservation not found' });
            }
            res.json(reservation);
        } else {
            const reservation = await Reservation.findOne({ contact: req.params.email });
            if (!reservation) {
                return res.status(404).json({ message: 'Reservation not found' });
            }
            res.json(reservation);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(404).json({ message: 'Users not found' });
        }
        console.log(users);
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};