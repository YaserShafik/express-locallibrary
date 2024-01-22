const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require("compression");
const helmet = require("helmet");
const mongoose = require("mongoose");

require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const coolRouter = require('./routes/cool');
const catalogRouter = require("./routes/catalog");

var app = express();

// Set up rate limiter: maximum of twenty requests per minute
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});
// Apply rate limiter to all requests
app.use(limiter);

app.use(
  helmet.contentSecurityPolicy({
    directive: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  }),
)

// Configuración de la base de datos
const usr = process.env.DB_USER || "contactoyaser";
const pass = process.env.DB_PASSWORD || "SquattyDaddy2001";

const dev_db_url = `mongodb://${usr}:${pass}@localhost:27017/local_library`;
const mongoDB = process.env.MONGODB_URI || dev_db_url;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
}

// Resto del código...

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Resto del código...

module.exports = app;
