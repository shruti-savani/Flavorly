const express = require("express")
const mongoose = require("mongoose")
const feedbackRoute = require("./routes/feedbackRoute")
const bodyParser = require("body-parser")
const cors = require("cors")
const orderRoute = require( "./routes/orderRoute" )
const reserveRoute = require( "./routes/reserveRoute" )
const menuItemRoute = require("./routes/menuItemRoute")
const galleryRoute = require('./routes/galleryRoute')
const chefsRoute = require("./routes/chefsRoute")
const userRoute = require('./routes/userRoute')
const onlineOrderRoute = require('./routes/onlineOrderRoute')
require("dotenv").config()


const app = express()

app.use(express.static('public'))
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(process.env.PORT))
    .catch((err) => console.log(err))

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }));

// app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use(menuItemRoute)
app.use(feedbackRoute)
app.use(orderRoute);
app.use(reserveRoute);
app.use(galleryRoute);
app.use(chefsRoute);
app.use(userRoute);
app.use(onlineOrderRoute);

