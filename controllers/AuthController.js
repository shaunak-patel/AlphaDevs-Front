const User = require("../models/UserModel");
const { createSecretToken } = require("../config/SecretToken");
const bcrypt = require("bcryptjs");
// const { userVerification } = require("../middlewares/AuthMiddleware");
const jwt = require('jsonwebtoken');

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt, userRole: 1 });
    const token = createSecretToken(user._id);
    console.log(token)
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    // next();
  } catch (error) {
    console.error(error);
  }
};

// module.exports.Login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     console.log(email)
//     if(!email || !password ){
//       return res.json({message:'All fields are required'})
//     }
//     const user = await User.findOne({ email });
//     if(!user){
//       return res.json({message:'Incorrect password or email' }) 
//     }
//     const auth = await bcrypt.compare(password,user.password)
//     if (!auth) {
//       return res.json({message:'Incorrect password or email' }) 
//     }
//     const token = createSecretToken(user._id);
//     res.cookie("token", token, {
//       withCredentials: true,
//       httpOnly: false,
//     });
//     res.status(201).json({ message: "User logged in successfully", success: true });
//     // next();
//   } catch (error) {
//     console.error(error);
//   }
// }

module.exports.Login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email)
  console.log(password)
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        'secretkeyappearshere',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString(), userEmail: loadedUser.email });
      console.log(token)
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

module.exports.GetUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.error('Token verification failed:', err.message);
      } else {
        const user = await User.findById(decoded.id);
        return res.status(201).json({ status: true, user: user });
      }
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports.Logout = async (req, res) => {
  try {
    await res.clearCookie('token');
    return res.json({ message: "User logged out successfully", status: true });
  } catch (error) {
    console.error(error);
  }
};