const express = require('express')
const router = new express.Router()

const controller = require('../controllers/user')

router.get('/login', controller.renderLogin)
router.post('/login', controller.loginUser)

router.get('/signup', controller.renderSignup)
router.post('/signup', controller.signupUser)

module.exports = router