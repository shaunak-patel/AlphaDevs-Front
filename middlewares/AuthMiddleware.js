const User = require("../models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// const userVerification = (req, res, next) => {
//     // console.log("in middleware");
//     const token = req.cookies.token;
//     // console.log(req.cookies);
//     if (!token) {
//         // console.log("!!!Token : ");
//         // return res.json({ status: false });
//         return res.status(401).json({ status: false, message: 'Unauthorized' });
//     }
//     jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
//         // console.log("in Verifying Token");
//         // console.log("Key : "+process.env.JWT_SECRET);
//         if (err) {
//             console.error('Verification error: ', err.message);
//             return res.status(403).json({ status: false, error: err.message });
//         } else {
//             const user = await User.findById(data.id);
//             if (user) {
//                 req.user = user; // Set the user in the request object
//                 next();
//             } else {
//                 return res.status(401).json({ status: false, message: 'Unauthorized' });
//             }
//         }
//     });
// };

// const authMiddleware = (req, res, next) => {
//     if (req.user) {
//         next();
//     } else {
//         res.status(401).json({ message: 'Unauthorized' });
//     }
// };
  
// module.exports = { userVerification, authMiddleware };

// /* const userVerification_bk = async (req, res, next) => {
//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).json({ status: false, message: 'Unauthorized' });
//     }

//     try {
//         const data = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findById(data.id);

//         if (user) {
//             req.user = user; // Set the user in the request object
//             next();
//         } else {
//             return res.status(401).json({ status: false, message: 'Unauthorized' });
//         }
//     } catch (err) {
//         console.error('Verification error: ', err.message);
//         return res.status(403).json({ status: false, error: err.message });
//     }
// }; */

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    console.log(decodedToken)
    decodedToken = jwt.verify(token,process.env.SECRET || 'secretkeyappearshere');
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};