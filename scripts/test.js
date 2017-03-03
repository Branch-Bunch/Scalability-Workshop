const mongoose = require('mongoose')
const Sortable = require('../models/Sortable')
const MONGODB_URI = require('../config').MONGODB_URI

mongoose.connect(MONGODB_URI)
console.log(`Connected to ${MONGODB_URI}`)
mongoose.Promise = Promise

Sortable.create({ value: 1, score: -3})
  .then(created => Sortable.findOne(created))
  .then((response) => {
    console.log(response)
    console.log('\n\nIt works!\nConnected successfully!')
    process.exit()
  })
  .catch(console.log)
