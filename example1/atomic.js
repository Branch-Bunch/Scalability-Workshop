const mongoose = require('mongoose')
const Sortable = require('../models/Sortable')
const MONGODB_URI = require('../config').MONGODB_URI
const id = require('../config').id

mongoose.connect(MONGODB_URI)
console.log(`Connected to ${MONGODB_URI}`)
mongoose.Promise = Promise

function incrementBadly() {
  Sortable.findById(id)
    .then((obj) => {
      console.log(obj)
      obj.score += 5
      return obj.save()
    })
    .then(console.log)
    .catch(console.log)
}

function incrementWell() {
  Sortable.findByIdAndUpdate(
    id,
    { $inc: { score: 5 } },
    { 
      new: true 
    })
    .then(console.log)
    .catch(console.log)
}
