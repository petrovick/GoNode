"use strict";
const moment = require("moment");
const crypto = require("crypto");
const User = use("App/Models/User");
const Mail = use("Mail");

class ForgotPasswordController {
  async store({ request, response }) {
    try {
      const email = request.input("email");
      const user = await User.findByOrFail("email", email);
      console.log(email);
      console.log(user);
      user.token = crypto.randomBytes(10).toString("hex");
      user.token_created_at = new Date();
      await user.save();

      await Mail.send(
        ["emails.forgot_password", "forgot_password_text"],
        {
          email,
          token: user.token,
          link: `${request.input("redirect_url")}?token=${user.token}`
        },
        message => {
          message
            .to(user.email)
            .from("petrovickg@gmail.com", "Petrovick | Rocketseat")
            .subject("Recuperação de senha");
        }
      );
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: "Algo não deu certo, esse e-mail existe?"
        }
      });
    }
  }

  async update({ request, response }) {
    try {
      const { token, password } = request.all();

      const user = await User.findByOrFail("token", token);
      //moment() == data atual
      const tokenExpired = moment()
        .subtract("2", "days")
        .isAfter(user.token_created_at);
      console.log("tokenExpired");

      if (tokenExpired) {
        return response.status(401).send({
          error: {
            message: "O token de recuperação está expirado."
          }
        });
      }

      user.token = null;
      user.token_created_at = null;
      user.password = password;

      await user.save();
    } catch (err) {
      console.log(err);
      return response.status(err.status).send({
        error: {
          message: "Algo não deu certo ao resetar sua senha."
        }
      });
    }
  }
}

module.exports = ForgotPasswordController;
