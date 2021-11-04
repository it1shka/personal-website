require('dotenv').config()
const express = require('express')
const expressSession = require('express-session')
const mongoose = require('mongoose')

const app = express()
app.use(express.urlencoded({extended: false}))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRECT
}))
app.use(function(req, res, next) {
  res.locals.loggedUser = req.session.loggedUser
  next()
})

app.get('/', (req, res) => {
  const recentPosts = [
    {title: 'Post 1', href: "#"},
    {title: 'Post 2', href: "#"},
    {title: 'Post 3', href: "#"}
  ]
  const bestProjects = [
    {title: 'Project 1', href: "#"},
    {title: 'Project 2', href: "#"},
    {title: 'Project 3', href: "#"}
  ]
  const mostActiveUsers = [
    'Tikhon',
    'Alex'
  ]
  res.render('index', {
    posts: recentPosts,
    projects: bestProjects,
    users: mostActiveUsers
  })
})

const userRouter = require('./routes/user')
app.use('/user', userRouter)

const adminRouter = require('./routes/admin')
app.use('/admin', adminRouter)

const blogRouter = require('./routes/blog')
app.use('/blog', blogRouter)

app.use((err, req, res, next) => {
  res.status(500).render('500')
  console.log(err)
})

app.use((req, res) => {
  res.status(404).render('404')
})

async function main() {
  const PORT = process.env.PORT || 3000
  const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/personal-website'
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}!`)
    })
  } catch(e) {
    console.log(e)
  }
}

main()