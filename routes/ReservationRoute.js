const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/ReservationController');
//const { userVerification } = require('../middlewares/AuthMiddleware');

//router.post('/', reservationController.createReservation);

// router.use(userVerification);

router.post('/create_re', reservationController.createReservation);
router.get('/users', reservationController.getUsers);
router.get('/:email', reservationController.getReservationByEmail);

module.exports = router;
