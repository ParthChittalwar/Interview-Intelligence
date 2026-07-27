const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const blacklistTokenModel = require('../models/blacklist.model');


const RegisterUserController = async (req, res) => {

    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({
             message: 'All fields are required'
        });
    }

    const isUserALreadyExists = await userModel.findOne({ 
        $or:[{username},{email}]
     });

     if(isUserALreadyExists) {
        return res.status(400).json({
             message: 'User already exists'
        });
     }

     const hash = await bcrypt.hash(password, 10);

     const user = await userModel.create({
        username,
        email,
        password: hash
     });

     const token = jwt.sign({
        id: user._id
     }, process.env.JWT_SECRET, {
        expiresIn: '1d'
     });

     res.cookie('token',token)

     res.status(201).json({
        message: 'User registered successfully',
        user : {
            id: user._id,
            username: user.username,
            email: user.email
        }
     });
    
}

const LoginUserController = async (req,res) => {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if(!user) {
        return res.status(400).json({
             message: 'User does not exist'
        });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(!isPasswordCorrect) {
        return res.status(400).json({
             message: 'Password is incorrect'
        });
    }

    const token = jwt.sign({
        id: user._id
     }, process.env.JWT_SECRET, {
        expiresIn: '1d'
     });


     res.cookie('token',token)

     res.status(200).json({
        message: 'User logged in successfully',
        user : {
            id: user._id,
            username: user.username,
            email: user.email
        }
     });
}

const LogOutUserController = async (req,res) => {
    const token = req.cookies.token;

    if(token){
        await blacklistTokenModel.create({
            token
        });
    }

    res.clearCookie('token');

    res.status(200).json({
        message: 'User logged out successfully'
    });


}

const getmeController = async (req,res) => {
    const user = await userModel.findById(req.user.id);


    res.status(200).json({
        message: 'User fetched successfully',
        user : {
            id: user._id,
            username: user.username,
            email: user.email
        }
     });
}


module.exports = {
    RegisterUserController,
    LoginUserController,
    LogOutUserController,
    getmeController
}