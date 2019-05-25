"use strict";

class ResetPassword {
  get validateAll() {
    return true;
  }
  get rules() {
    return {
      // validation rules
      username: "required",
      email: "required|email",
      password: "required",
      new_password: "required|confirmed"
    };
  }
}

module.exports = ResetPassword;
