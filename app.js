const dotenv = require( 'dotenv' );
dotenv.config();
const express = require('express');
const userRoutes = require( './routes/userRoutes' );
const captainRoutes = require('./routes/captainRoutes');
const cookieParser = require("cookie-parser");

const cors = require( 'cors' );
const connectDB = require('./db/db');
const app = express();
connectDB( )

app.use( cors() );
app. use( express.json() );
app.use(cookieParser());
app.use ( express.urlencoded( { extended: true } ) );
app.use('/user',userRoutes)
app.use('/captain',captainRoutes)

module.exports = app;