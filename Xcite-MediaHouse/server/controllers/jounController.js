const asyncHandler = require("express-async-handler");
const Journalist = require('../models/jounModel');
const bycrpt = require('bcryptjs');
const generateToken = require("../middlewares/generateToken");


// Journalist Register
const jounRegister = asyncHandler(async(req,res) => {
    const {name,email,password,resume} = req.body;
    
    const journalist = await Journalist.findOne({email});

    if(!journalist){

        const hashPassword = await bycrpt.hash(password,5);

        const newJoun =  await Journalist.create({
            name,
            email,
            password : hashPassword,
            resume
        })

        if(newJoun){
            res.status(200).json({
                success : true,
                message : "User Register Successfully!",
                joun : newJoun
            })
        }


    }else{
        return res.status(400).json({
            success : false,
            error : "User Already Registered!"
        })
    }

})

// Jounarlist Login
const jounLogin = asyncHandler(async(req,res) => {
    const { email, password } = req.body;

    const journalist = await Journalist.findOne({ email });

    if(journalist){
        const passwordMatched =  await bycrpt.compare(password,journalist.password);

        if(passwordMatched){
            res.status(200).json({
                success : true,
                error : "Journalist login successfully",
                token : generateToken(journalist._id)
            })
        }else{
            return res.status(404).json({
                success : false,
                error : "Invalid email or password"
            })
        }
        

    }else{
        return res.status(404).json({
            success : false,
            error : "Invalid email or password"
        })
    }
    
})


module.exports = { jounRegister, jounLogin }