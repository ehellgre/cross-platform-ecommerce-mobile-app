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


