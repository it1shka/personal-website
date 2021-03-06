const express = require('express')
const controller = require('../controllers/admin')

const router = new express.Router()
router.use(function(req, res, next) {
  if(req.session.loggedUser == undefined || 
    req.session.loggedUser.role != 'admin')
    res.redirect('/')
  next()
})

router.get('/', controller.renderMain)
router.post('/add-admin', controller.addAdmin)

router.get('/post', controller.renderPostForm)
router.post('/post', controller.createPost)
router.delete('/post/:id', controller.deletePost)
router.put('/post/:id', controller.updatePost)

module.exports = router