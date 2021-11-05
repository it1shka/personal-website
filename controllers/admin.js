const User = require('../models/user')
const Post = require('../models/post')

class AdminController {
  async renderMain(req, res) {
    const admins = await User.find({ role: 'admin' })
    res.render('admin/index', { admins })
  }

  addAdmin(req, res) {
    try {
      const email = req.body.email
      User.findOneAndUpdate({ email }, { role: 'admin' })
    } finally {
      res.redirect('/admin')
    }
  }

  async renderPostForm(req, res) {
    res.render('admin/createpost', { post: new Post })
  }

  async createPost(req, res) {
    const author = req.session.loggedUser.username
    const title = req.body.title
    const description = req.body.desc 
    const markdown = req.body.markdown

    let post = new Post({
      author, title,
      description, markdown
    })

    try {
      post = await post.save()
      res.redirect('/blog')
    } catch {
      res.render('admin/createpost', { post })
    }
  }

  async deletePost(req, res) {
    const id = req.params.id
    await Post.findByIdAndRemove(id)
    res.redirect('/blog')
  }

  updatePost(req, res) {

  }

}

module.exports = new AdminController