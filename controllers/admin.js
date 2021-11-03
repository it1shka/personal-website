const User = require('../models/user')

class AdminController {
  async renderMain(req, res) {
    const admins = await User.find({ role: 'admin' })
    res.render('admin/index', { admins })
  }

  async addAdmin(req, res) {
    try {
      const email = req.body.email
      await User.findOneAndUpdate({ email }, { role: 'admin' })
    } finally {
      res.redirect('/admin')
    }
  }

  async renderPostForm(req, res) {
    res.render('admin/createpost')
  }

  async createPost(req, res) {
    res.send('__to be continued__')
  }

}

module.exports = new AdminController