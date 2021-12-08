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

  if(req.session.mostActiveUsers == undefined) {
    let mostActiveUsers
    if(req.session.loggedUser != undefined) {
      mostActiveUsers = await User.aggregate([{$sample: {size: 2}}]).exec()
      mostActiveUsers.unshift(req.session.loggedUser)
    } else {
      mostActiveUsers = await User.aggregate([{$sample: {size: 3}}]).exec()
    }
    mostActiveUsers = mostActiveUsers.map(user => user.username)
    req.session.mostActiveUsers = mostActiveUsers
  }
  
  res.render('index', {
    posts: recentPosts,
    projects: bestProjects,
    users: req.session.mostActiveUsers
  })
}

module.exports = mainPage