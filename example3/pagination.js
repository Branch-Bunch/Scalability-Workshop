const mongoose = require('mongoose')
const Sortable = require('../models/Sortable')
const MONGODB_URI = require('../config').MONGODB_URI

mongoose.Promise = Promise
mongoose.connect(MONGODB_URI)
console.log(`Connected to ${MONGODB_URI}`)

function rangeAndLimit() {
  Sortable.find({ createdAt:
    { $lte: (new Date('2017/03/15').getTime()) } 
  })
    .limit(10)
    .then(console.log)
    .catch(console.log)
}

function skipAndLimit() {
  Sortable.find({})
    .skip(10)
    .limit(10)
    .then(console.log)
    .catch(console.log)
}
