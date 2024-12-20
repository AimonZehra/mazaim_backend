const { Users } = require('../../../../models');
const { successResponse, errorResponse } = require('../../../helper')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const comparePassword = async (plainPassword, hashedPassword) => {
//     try {
//         const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
//         if (!isMatch) {
//             throw new Error('Old password does not match.');
//         }
//         return isMatch;
//     } catch (error) {
//         throw new Error('Error comparing passwords');
//     }
// };

let AuthController = {
    signup: async (req, res) => {
        try {
            const { username, email, password } = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await Users.create({
                username,
                email,
                password: hashedPassword
            });

            await newUser.save();
            return res.status(200).json({ newUser });
        } catch (error) {
            console.error(error);
            // errorResponse(res, 500, 'An error occurred during signup');
        }
    },



    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({ where: { email: email } });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                // errorResponse(res, 401, 'Invalid email or password');
                return res.status(200).json('Invalid email or password');
                return;
            }

            const token = jwt.sign({ id: user.id }, process.env.NODE_SECRET_KEY, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });
            console.log('Generated Token:', token);
            return res.status(200).json({ token, user });
       
          
        } catch (error) {
            console.error("Error occurred during login:", error);
            // errorResponse(res, 500, "An error occurred during login");
        }
    },
   
    // updateUser: async (req, res) => {
    //     try {

    //         const { username, email, old_password, password  } = req.body;
    //         const userId = req.session.userId;
    //         var hashedPassword = null
    //         var updatedUser= null ;
    //         let user = await User.findOne({ where: { id: userId } })
    //         if (password) {
    //         const compare = await comparePassword(old_password, user.password);
    //         if (compare) {

    //             hashedPassword = await bcrypt.hash(password, 10);
    //             updatedUser =  await User.update({
    //                 username,
    //                 email,
    //                 password: hashedPassword

    //             }, { where: { id: userId } });

    //             updatedUser = await User.findOne({ where: { id: user.id } });
    //             delete updatedUser.password;
    //         }
    //         } else {
    //              updatedUser = await User.update({
    //                 username,
    //                 email,

    //             }, { where: { id: userId } });

    //         }

    //         if (!updatedUser) {
    //             return errorResponse(res, 404, 'User message not found');
    //         }
    //          user = await User.findOne({ where: { id: userId } })
    //         successResponse(res, 200, `The user with ID ${userId} has been updated`, user);



    //     } catch (error) {
    //         console.error(error.message);
    //         return errorResponse(res, 500, error.message);
    //     }
    // }



};



module.exports = AuthController;
