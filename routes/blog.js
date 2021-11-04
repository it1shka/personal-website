const express = require('express')
const router = new express.Router()

router.get('/', (req, res) => {
  res.send('My blog!')
})

module.exports = router