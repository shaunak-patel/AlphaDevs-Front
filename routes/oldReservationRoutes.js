const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/ReservationController');
//const { userVerification } = require('../middlewares/AuthMiddleware');

//router.post('/', reservationController.createReservation);
//router.get('/:email', reservationController.getReservationByEmail);

// router.use(userVerification);

router.post('/create_re', reservationController.createReservation);
router.get('/:email', reservationController.getReservationByEmail);
// router.get('/reservations/email/:email', reservationController.getReservationByEmail);

module.exports = router;
