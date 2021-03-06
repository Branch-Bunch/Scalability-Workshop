const mongoose = require('mongoose')
const Sortable = require('../models/Sortable')
const MONGODB_URI = require('../config').MONGODB_URI

mongoose.Promise = Promise
mongoose.connect(MONGODB_URI)
console.log(`Connected to ${MONGODB_URI}`)

const sortParams = { createdAt: -1 }  // sort by newest date

Sortable.find({})
  .sort(sortParams)
  .then(console.log)
  .then(process.exit)
  .catch(console.log)
