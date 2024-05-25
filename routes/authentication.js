const router = require("express").Router();
const bcrypt = require("bcrypt")
const User = require("../model/user")
const jwt = require("jsonwebtoken");

require("dotenv/config")

const createToken = (id) => {
    return jwt.sign(
        {id}, process.env.JWT_SECRET
    )
}

router.post("/register", async(req, res) => {
    try {
        const {name, email, password} = req.body
        // check if user already exists
        const existingUser = await User.findOne({email})
        if(existingUser) {
            return res.json({
                status : 400,
                message : "User Already Exists"
            })
        }

        // encrypting the password 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        // creating a new user 

        const newUser = new User({
            name,
            email,
            password : hashedPassword
        })

        await newUser.save()

        // creating jwt token 
        const token = createToken(newUser._id);
        res.json({
            success : true,
            message : "User created successfully",
            jwt_token : token
        });
    } catch (error) {
      res.json({
        status : 400,
        message : error.message
      })
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password} = req.body

        // checking if email is valid 
        const findUser = await User.findOne({email : email})
        if (!findUser) {
            return res.json({
                status : 400,
                message : "user does not exists"
            })
        }

        // checking password is match 

        const isMatch = await bcrypt.compare(password, findUser.password)
        if (!isMatch) {
            return res.json({
                status : 400,
                message : "Incorrect Password"
            })
        }

        const token = createToken(findUser._id);
        res.json({
            success : true,
            message : "User logged in successfully",
            jwt_token : token
        })

    } catch (err) {
        res.json({
            status : 400,
            message: err.message
        })
    }
})

module.exports = router