"use strict";

const User = use("App/Models/User");

class ResetPasswordController {
  async store({ request, response }) {
    const { username, email, password, new_password } = request.all();

    console.log(username);
    console.log(password);
    console.log(email);
    console.log(new_password);

    const user = await User.findByOrFail("email", email);
    user.username = username;
    user.password = new_password;
    await user.save();

    return user;
  }
}

module.exports = ResetPasswordController;
