const mongoose = require('mongoose')
const Sortable = require('../models/Sortable')
const MONGODB_URI = require('../config').MONGODB_URI
const _id = require('../config').id

mongoose.connect(MONGODB_URI)
console.log(`Connected to ${MONGODB_URI}`)
mongoose.Promise = Promise

function incrementBadly(id, amount) {
  Sortable.findById(id)
    .then((obj) => {
      console.log(obj)
      obj.score += amount
      return obj.save()
    })
    .then(console.log)
    .catch(console.log)
}

function incrementWell(id, amount) {
  Sortable.findByIdAndUpdate(
    id,
    { $inc: { score: amount } },
    { 
      new: true 
    })
    .then(console.log)
    .catch(console.log)
}

incrementBadly(_id, -5)
incrementBadly(_id, -5)
