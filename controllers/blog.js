const Post = require('../models/post')

class BlogController {
  async renderMain(req, res) {
    const posts = await Post.find().sort({createdAt: 'desc'}).exec()
    res.render('blog/index.ejs', { posts })
  }
}

module.exports = new BlogController