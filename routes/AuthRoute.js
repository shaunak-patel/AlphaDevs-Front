const { Signup, Login, Logout, GetUser } = require('../controllers/AuthController');
const router = require('express').Router();
// const { userVerification } = require('../middlewares/AuthMiddleware');
const isAuth = require('../middlewares/AuthMiddleware')

router.get("/", (req, res) => {
  res.json({ message: "Welcome to The AlphaDevs' World." });
});

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/logout',isAuth, Logout);

// router.use(userVerification);

router.get('/user', GetUser);

module.exports = router;