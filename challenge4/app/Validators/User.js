"use strict";

class User {
  get validateAll() {
    return true;
  }
  get rules() {
    return {
      username: "required|unique",
      email: "required|email|unique",
      password: "required|confirmed"
      // validation rules
    };
  }
}

module.exports = User;
