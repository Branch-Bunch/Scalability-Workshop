'use strict'
const fs = require('fs')

function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(path, { encoding: 'utf8' }, resolve)
    } catch(e) {
      reject(e)
    }
  })
}

function readFileSync(path) {
  return fs.readFileSync(path, { encoding: 'utf8' })
}

function getJSONContents(contents) {
    const orders = JSON.parse(contents).orders
    return orders[0].total_price
}

const beforeSync = Date.now()
let arrSync = []
for (let i = 0; i < 3; i++) {
  const contents = readFileSync(`./data/page${i}.json`)
  arrSync.push(contents)
}
const afterSync = Date.now()
console.log(`sync: ${afterSync - beforeSync}`)

const before = Date.now()
let arr = []
for (let i = 0; i < 3; i++) {
  arr.push(readFilePromise(`./data/page${i}.json`))
}
const after = Date.now()

Promise.all(arr)
  .then(contents => {
    console.log(`async: ${after - before}`)
  })
  .catch(console.log)

