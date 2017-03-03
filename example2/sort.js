const mongoose = require('mongoose')
const Sortable = require('../models/Sortable')
const MONGODB_URI = require('../config').MONGODB_URI
const _id = require('../config').id

mongoose.connect(MONGODB_URI)
console.log(`Connected to ${MONGODB_URI}`)
mongoose.Promise = Promise

function comparison(first, second) {
  return (first.value < second.value) ? 1 : -1
}

function sortByValueBadly() {
  Sortable.find({})
    .then(largeArray => largeArray.sort(comparison).splice(0, 10))
    .then(console.log)
    .catch(console.log)
}

function sortByValueWell() {
  Sortable.find({})
    .sort({ value: -1 })
    .limit(10)
    .then(console.log)
    .catch(console.log)
}
