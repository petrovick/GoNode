require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const Youch = require('youch')
const Sentry = require('@sentry/node');
const validate = require('express-validation')
const databaseConfig = require('./config/database')
const sentryConfig = require('./config/sentry')

class App {
  constructor() {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middlewares()
    this.database()
    this.routes()
    this.sentry()
    this.exception()

  }

  sentry() {
    Sentry.init(sentryConfig);
  }

  database() {
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
  }

  middlewares(){
    // The request handler must be the first middleware on the app
    this.express.use(Sentry.Handlers.requestHandler());
    this.express.use(express.json())
  }

  routes(){
    this.express.use(require('./routes'))
  }

  exception(){
    if(process.env.NODE_ENV == 'production')
    {
      // The error handler must be before any other error middleware
      this.express.use(Sentry.Handlers.errorHandler());
    }
    this.express.use( async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      if(process.env.NODE_ENV != 'production')
      {
        const youch = new Youch(err, req)
        return res.json(await youch.toJSON())
      }

      return res.status(err.status || 500).json({error: 'User error connection.'})
    })
  }
  
}

module.exports = new App().express