const Post = require('../models/post')

class BlogController {
  async renderMain(req, res) {
    const posts = await Post.find().sort({createdAt: 'desc'}).exec()
    res.render('blog/index.ejs', { posts })
  }

  async renderPost(req, res) {
    const slug = req.params.slug
    const post = await Post.findOne({ slug })
    if(post == null) {
      res.render('blog/notfound')
    } else {
      res.render('blog/post', { post })
    }
  }
}

module.exports = new BlogController