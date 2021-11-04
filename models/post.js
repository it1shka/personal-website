const marked = require('marked')
const mongoose = require('mongoose')
const slugify = require('slugify')

const PostSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: () => new Date
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  markdown: {
    type: String,
    required: true
  },
  html: String, // compiled markdown
  slug: String  // like a url
})
PostSchema.pre('validate', function(next) {
  if(this.markdown) {
    const compiledHtml = marked.parse(this.markdown)
    this.html = compiledHtml
  }

  if(this.title) {
    const slug = slugify(this.title, {
      strict: true,
      lower: true
    })
    this.slug = slug
  }
  next()
})
module.exports = mongoose.model('Post', PostSchema)