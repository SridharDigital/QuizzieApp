const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

const Admin = mongoose.model("Admin", {
  name: String,
  email: String,
  password: String,
})

const Quiz = mongoose.model("Quiz", {
  name: String,
  adminId: String,
  name: String,
  urlPath: String,
  type: String,
  date: Date,
  impressions: Number,
  questions: [
    {
      id: String,
      question: String,
      optionType: String,
      timer: Number,
      options: [
        {
          text: String,
          imageURL: String,
          isCorrect: Boolean,
          clickCount: Number,
        },
      ],
    },
  ],
  attempted: Number,
  answeredCorrectly: Number,
})

app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log(`The server is running at http://localhost:${process.env.PORT}`)
  } catch (error) {
    console.log(error)
  }
})
