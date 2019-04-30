const { User } = require('../models')
class UserController {
  create (req, res) {
    return res.render('auth/signup')
  }

  async store (req, res) {
    console.log(req.file);
    const { filename: avatar } = req.file

    await User.create({ ...req.body, avatar })

    return res.redirect('/')
  }
}

module.exports = new UserController()
