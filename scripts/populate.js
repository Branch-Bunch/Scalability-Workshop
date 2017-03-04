const ObjectId = require('mongoose').Types.ObjectId
const Sortable = require('../models/Sortable')
const idString = require('../config').id
const mongoose = require('mongoose')
const MONGODB_URI = require('../config').MONGODB_URI

mongoose.Promise = Promise
mongoose.connect(MONGODB_URI)
console.log(`Connected to ${MONGODB_URI}`)

function populate() {
  return new Promise((resolve, reject) => {
    const value = Math.ceil(Math.random() * 100)
    const sign = (Math.random() >= 0.5) ? 1 : -1
    const score = Math.floor(value * Math.random() * sign)
    const day = Math.ceil(Math.random() * 30)
    const createdAt = (new Date(`2017/03/${day}`)).getTime()
    Sortable.create({ value, score, createdAt })
      .then(resolve)
      .catch(reject)
  })
}

const _id = new ObjectId(idString)

//Sortable.findById({ _id }).remove().exec() // remove duplicates

Sortable.create({ value: 10, score: 5, _id, createdAt: (new Date('2017/03/15').getTime()) })
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
