'use strict'

const Antl = use('Antl')
class User {
  get validateAll () {
    return true
  }
  get rules () {
    return {
      username: 'required|unique',
      email: 'required|email|unique',
      password: 'required|confirmed'
      // validation rules
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = User
