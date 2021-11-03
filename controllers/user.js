const User = require('../models/user')
const bcrypt = require('bcrypt')

class UserController {
  renderLogin(req, res) {
    res.render('login')
  }

  async loginUser(req, res) {
    const email = req.body.email
    const password = req.body.password
    try {
      const user = await User.findOne({ email })
      const hashedPwd = user.password
      const isValid = await bcrypt.compare(password, hashedPwd)
      if(isValid) {
        req.session.loggedUser = user
        res.redirect('/')
      }
    } finally {
      res.render('login', { email, password })
    }
  }

  renderSignup(req, res) {
    res.render('signup')
  }

  async signupUser(req, res) {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    try {
      if(password !== confirmPassword) throw new Error
      const hashedPwd = await bcrypt.hash(password, 10)
      const newUser = new User({ username, email, password: hashedPwd })
      req.session.loggedUser = await newUser.save()
      res.redirect('/')
    } finally {
      res.render('signup', { username, email, password, confirmPassword })
    }
  }

  logoutUser(req, res) {
    delete req.session.loggedUser
    res.redirect('/user/login')
  }
}

module.exports = new UserController