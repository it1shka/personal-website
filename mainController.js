const Post = require('./models/post')
const User = require('./models/user')

async function mainPage(req, res) {
  const recentPosts = await Post.find()
    .sort({createdAt: 'desc'}).limit(3).exec()
  
  const bestProjects = [
    {title: 'Project 1', href: "#"},
    {title: 'Project 2', href: "#"},
    {title: 'Project 3', href: "#"}
  ]

  let mostActiveUsers = await User.aggregate([{$sample: {size: 3}}]).exec()
  
  mostActiveUsers = mostActiveUsers.map(user => user.username)
  
  res.render('index', {
    posts: recentPosts,
    projects: bestProjects,
    users: mostActiveUsers
  })
}

module.exports = mainPage