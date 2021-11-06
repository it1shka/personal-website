const express = require('express')
const controller = require('../controllers/blog')
const router = new express.Router()

router.get('/', controller.renderMain)
router.get('/:slug', controller.renderPost)
module.exports = router