const mongoose = require('mongoose')
const Sortable = require('../models/Sortable')
const MONGODB_URI = require('../config').MONGODB_URI

mongoose.Promise = Promise
mongoose.connect(MONGODB_URI)
console.log(`Connected to ${MONGODB_URI}`)

Sortable.find({})
  .sort({ createdAt: -1 })
  .then(console.log)
  .then(process.exit)
  .catch(console.log)
