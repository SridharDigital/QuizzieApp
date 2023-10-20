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

app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body
    const isEmailTaken = await Admin.findOne({ email: email.toLowerCase() })
    // console.log({ name, email, password })
    // console.log(isEmailTaken)
    if (isEmailTaken) {
      throw "Email already in use"
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    // console.log("Hashed Password:", hashedPassword)

    const newAdmin = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    }

    const createdAdmin = await Admin.create(newAdmin)
    console.log("Admin Details1:", createdAdmin)

    const jwtToken = jwt.sign({ newAdmin }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15d",
    })

    console.log("Admin Details2:", createdAdmin)

    res.status(201)
    res.send({
      status: "SUCCESS",
      message: "Account successfully created",
      data: { jwtToken, admin: { id: createdAdmin._id } },
    })
  } catch (error) {
    // console.log("Error:", error)
    res.status(400)
    res.send({ status: "FAIL", message: error })
  }
})

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const existingAdmin = await Admin.findOne({
      email: email.toLowerCase(),
    })
    console.log(existingAdmin)

    if (existingAdmin) {
      const hashedPassword = existingAdmin.password
      const isPasswordCorrect = await bcrypt.compare(password, hashedPassword)

      if (isPasswordCorrect) {
        const jwtToken = jwt.sign(
          { existingAdmin },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "15d",
          }
        )

        res.status(200)
        res.send({
          status: "SUCCESS",
          message: "Login Successful",
          data: { jwtToken, Admin: { id: existingAdmin._id } },
        })
      } else {
        throw "Incorrect password"
      }
    } else {
      throw "Admin not found"
    }
  } catch (error) {
    res.status(400)
    res.send({
      status: "FAIL",
      message: error,
    })
  }
})

app.get("/test", (req, res) => {
  res.send("The server is working")
})

app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log(`The server is running at http://localhost:${process.env.PORT}`)
  } catch (error) {
    console.log(error)
  }
})
