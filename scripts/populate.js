const ObjectId = require('mongoose').Types.ObjectId
const Sortable = require('../models/Sortable')
const idString = require('../config').id
const mongoose = require('mongoose')
const MONGODB_URI = require('../config').MONGODB_URI

mongoose.connect(MONGODB_URI)
console.log(`Connected to ${MONGODB_URI}`)
mongoose.Promise = Promise

function populate() {
  return new Promise((resolve, reject) => {
    const value = Math.floor(Math.random() * 100)
    const sign = (Math.random() >= 0.5) ? 1 : -1
    const score = Math.floor(value * Math.random() * sign)
    Sortable.create({ value, score })
      .then(resolve)
      .catch(reject)
  })
}

const _id = new ObjectId(idString)

//Sortable.findById({ _id }).remove().exec() // remove duplicates

Sortable.create({ value: 10, score: 5, _id })
  .then(console.log)
  .catch((err) => {
    console.log(`Don't run this multiple times`)
  })

const promiseArray = new Array(100)
console.log(promiseArray.length)

for (let i = 0; i < 100; i++) {
  promiseArray[i] = populate()
}

Promise.all(promiseArray)
  .then((data) => {
    console.log('populated')
    process.exit()
  })
  .catch(console.log)
