const router = require('express').Router();
const { check, validationResult } = require("express-validator");
const { users } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post('/signup', [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Please provide a password greater than 6 characters").isLength({
        min: 6
    })
], async (req, res) => {
    const { password, email } = req.body;
    // console.log(password, email);

    //Validate user inputs
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    //Check if the user already exist in the database
    let user = users.find((user) => {
        return user.email === email
    });

    if(user){
        return res.status(400).json({
            "errors": [
                {
                    "msg": "User already exist",
                }
            ]
        })
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //console.log(hashedPassword);

    //Store user email and password
    users.push({
        email,
        password: hashedPassword
    })

    //Generate JWT and send
    const token = await jwt.sign({
        email
    }, process.env.SECRET ,  {
        expiresIn: 36000
    })

    //res.send("Auth route working and validated");
    res.json({
        token
    });
})


router.get("/all", (req, res) => {
    res.json(users);
})

router.post("/login", async (req, res) => {
    const { password, email } = req.body;

    let user = users.find((user) => {
        return user.email === email
    });

    if(!user){
        return res.status(400).json({
            "errors": [
                {
                    "msg": "Invalid credentials",
                }
            ]
        })
    }    

    let isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json({
            "errors": [
                {
                    "msg": "Invalid credentials",
                }
            ]
        })
    }

    //Generate JWT and send
    const token = await jwt.sign({
        email
    }, process.env.SECRET, {
        expiresIn: 36000
    })

    //send JWT token
    res.json({
        token
    });    
})


module.exports = router