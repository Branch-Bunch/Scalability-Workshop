const mongoose = require('mongoose')
const Sortable = require('../models/Sortable')
const MONGODB_URI = require('../config').MONGODB_URI

mongoose.connect(MONGODB_URI)
console.log(`Connected to ${MONGODB_URI}`)
mongoose.Promise = Promise

Sortable.find({})
  .then(console.log)
