const marked = require('marked')
const mongoose = require('mongoose')

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
  html: String // compiled markdown
})
PostSchema.pre('save', function(next) {
  if(this.markdown) {
    const compiledHtml = marked.parse(this.markdown)
    this.html = compiledHtml
  }
  next()
})
module.exports = mongoose.model(PostSchema)