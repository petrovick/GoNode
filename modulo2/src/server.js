const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
// const nosniff = require('dont-sniff-mimetype')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV
    this.middlewares()
    this.views()
    this.routes()
    //    this.express.use(nosniff())
  }

  middlewares () {
    this.express.use(express.urlencoded({ extended: false }))
  }

  views () {
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    })

    this.express.use(express.static(path.resolve(__dirname, 'public')))
    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(require('./routes'))
  }
}
// Instância de app
module.exports = new App().express
