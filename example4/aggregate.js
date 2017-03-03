const mongoose = require('mongoose')
const Sortable = require('../models/Sortable')
const MONGODB_URI = require('../config').MONGODB_URI

mongoose.Promise = Promise
mongoose.connect(MONGODB_URI)
console.log(`Connected to ${MONGODB_URI}`)

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
