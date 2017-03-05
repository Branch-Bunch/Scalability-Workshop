const mongoose = require('mongoose')
const Sortable = require('../models/Sortable')
const MONGODB_URI = require('../config').MONGODB_URI

mongoose.Promise = Promise
mongoose.connect(MONGODB_URI)
console.log(`Connected to ${MONGODB_URI}`)

function rangeAndLimit(findOptions) {
  Sortable.find(findOptions)
    .sort({ createdAt: -1 })
    .limit(10)
    .then(console.log)
    .catch(console.log)
}

function skipAndLimit(page) {
  const skipAmount = 10
  Sortable.find({})
    .sort({ createdAt: -1 })
    .skip(skipAmount * page)
    .limit(10)
    .then(console.log)
    .catch(console.log)
}

// Client would tell you what page they want
const page = 5 
// Client would tell you this is last element 
const findOptions = {
  createdAt: { 
    $lt: (new Date('2017/03/15').getTime()) 
  } 
}
