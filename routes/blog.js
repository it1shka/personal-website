const express = require('express')
const controller = require('../controllers/blog')
const router = new express.Router()

router.get('/', controller.renderMain)

module.exports = router