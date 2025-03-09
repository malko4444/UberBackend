

const dotenv = require( 'dotenv' );
dotenv.config();
const express = require('express');
const userRoutes = require( './routes/userRoutes' );
// const connectDB = require( './db/db.js' );
const cors = require( 'cors' );
const connectDB = require('./db/db');
const app = express();
connectDB( )

app.use( cors() );
app. use( express.json() );
app.use ( express.urlencoded( { extended: true } ) );
app.use('/user',userRoutes)

module.exports = app;