const mongoose = require('mongoose')
const Sortable = require('../models/Sortable')
const MONGODB_URI = require('../config').MONGODB_URI

mongoose.Promise = Promise
mongoose.connect(MONGODB_URI)
console.log(`Connected to ${MONGODB_URI}`)

function getValue(obj) {
  return (obj.score / obj.value)
}

function comparison(first, second) {
  return (getValue(first) < getValue(second)) ? 1 : -1
}

function aggregateBadly() {
  Sortable.find({})
    .then(largeArray => largeArray.sort(comparison).splice(0, 10))
    .then(console.log)
    .catch(console.log)
}

function aggregateWell() {
  Sortable.aggregate([
    {
      $project: {
        score: '$score',
        value: '$value',
        popularity: {
          $divide: [ '$score', '$value' ]
        }
      }
    },
    { 
      $sort: { popularity: -1} 
    },
  ])
    .limit(10)
    .then(console.log)
    .catch(console.log)
}
