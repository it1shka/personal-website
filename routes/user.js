const express = require('express')
const controller = require('../controllers/user')

const router = new express.Router()
router.get('/logout', controller.logoutUser)

router.use(function(req, res, next) {
  if(req.session.loggedUser !== undefined) {
    res.redirect('/')
  } else {
    next()
  }
})
router.get('/login', controller.renderLogin)
router.post('/login', controller.loginUser)

router.get('/signup', controller.renderSignup)
router.post('/signup', controller.signupUser)

module.exports = router