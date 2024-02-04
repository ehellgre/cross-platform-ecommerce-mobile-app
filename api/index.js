require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

const app = express()
const port = 8000
const cors = require('cors')
app.use(cors())

app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json())

const jwt = require('jsonwebtoken')

// mongo connection
mongoose.connect(process.env.MONGO_URI, {
    // tutorial options were deprecated so not including those
}).then(() => {
    console.log("Connected to Mongo")
}).catch((err) => {
    console.log("MongoDB connection err: ", err)
})

app.listen(port, () => {
    console.log("Server running on port: ", port)
})

const User = require("./models/user")
const Order = require("./models/order")

// FUNCTION for sending the verification email to new user
const sendVerificationEmail = async (email, verificationToken) => {

    // create a nodemailer transport
    const transporter = nodemailer.createTransport({
        // conf the email service
        service: "gmail",
        auth: {
            user: process.env.EMIL_GMAIL_USERNAME,
            pass: process.env.GMAIL_SOVELLUSSALASANAT_PASSWORD,
        }
    })

    // compose the email msg
    const mailOptions = {
        from: "amazon.com",
        to: email,
        subject: "Email Verification",
        text: `Please click the following link to verify your email: ${process.env.IP_ADDRESS}:8000/verify/${verificationToken}`
    }

    // send the verification email
    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log("Error sending the verification email: ", error)
        throw error;
    }
}

// end point for Register
app.post("/register", async(req, res) => {
    try {
        const {name, email, password} = req.body

        // check if email already taken
        const existingUser = await User.findOne({email})

        if (existingUser) {
            return res.status(400).json({message: "Email already registered"})
        }

        // create the new user
        const newUser = new User({name, email, password})

        // generate and store the verification token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex")

        // save the user to the db
        await newUser.save()
        res.status(201).json({message: "user registered succesfully"})

        // send verification email to the user
        await sendVerificationEmail(newUser.email, newUser.verificationToken)
            .catch(error => console.log("Error sending the verification email: ", error))

    } catch (error) {
        console.log("error registering user", error)
        res.status(500).json({message: "Registration failed"})
    }
})

// end point for Verifying the Email
app.get("/verify/:token", async(req, res) => {
    try {
        const token = req.params.token;

        // find the user with given token
        const user = await User.findOne({verificationToken: token})
        if (!user) {
            return res.status(404).json({message: "Invalid verification token"})
        }

        // mark the user as verified
        user.verified = true
        user.verificationToken = undefined

        await user.save()

        res.status(200).json({message: "Email verified succesfully"})

    } catch (error) {
        res.status(500).json({message: "Email Verification failed"})
    }
})

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex")
    return secretKey
}

const secretKey = generateSecretKey()

// endpoint for login
app.post("/login", async (req, res) => {
    try {

        const {email, password} = req.body

        // check if user
        const user = await User.findOne({email})
        if (!user) {
            return res.status(401).json({message: "Invalid email or password"})
        }

        if (user.password !== password) {
            return res.status(401).json({message: "Invalid password"})
        }

        // generate jwt token
        const token = jwt.sign({userId: user._id}, secretKey)
        res.status(200).json({token})

    } catch (error) {
        res.status(500).json({message: "Login failed"})
        console.log("error login", error)
    }
})

// endpoint for storing new addresses
app.post("/addresses", async (req, res) => {

    try {
        const { userId, address } = req.body

        // find user by the userid
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({message: "User not found"})
        }

        // add the new address to users addresses array
        user.addresses.push(address)

        // save
        await user.save()

        res.status(200).json({message: "Address created"})

    } catch (error) {
        res.status(500).json({message: "Error adding address"})
    }
})

// endpoint to getting all addresses of an user
app.get("/addresses/:userId", async (req, res) => {
    try {
        const userId = req.params.userId

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }

        const addresses = user.addresses
        res.status(200).json({addresses})

    } catch (error) {
        res.status(500).json({ message: "Error retrieving the addresses"})
    }
})