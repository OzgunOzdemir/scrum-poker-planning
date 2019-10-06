'use strict';

const path = require('path');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./config/environment');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

//connect database
mongoose.connect('mongodb://localhost/poker', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('open', () => {
    console.log("MongoDB: Connected");
});
mongoose.connection.on('error', (err) => {
    console.log(("MongoDB: Error", err))
})

// let staticPath = 'src';

// if(config.env!=='development') {
//     app.set('trust proxy', 1);
//     app.use(morgan('tiny'));
//     staticPath = 'src';
// } else {
//     app.use(morgan('dev'));
// }

app.use(cors())
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(methodOverride());
app.use(cookieParser());
// app.use(express.static(path.join(config.root, staticPath)));
app.use(passport.initialize());

module.exports = app;

