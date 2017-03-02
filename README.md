# Scaling Database Queries with Nodejs and MongoDB

What we'll be covering:

1. [Atomic Database Actions](#atomic-database-actions)
2. [Database Queries](#database-queries)
3. [Pagination](#pagination)
4. [Aggregation Pipelines](#aggregation-pipelines)

### Setting up your environment
See setup.md

1. Download Nodejs, MongoDB
2. Run mongod (running as root makes it easier)
3. Git clone this repo
4. ```npm run build```


### Atomic Database Actions

- Lower the amount of requests made, and reduce waiting
- Eliminate the chance of race conditions, or operating on out of date values
- Example: Increasing a value by finding it and saving it, vs increasing a value by findbyid and update

```js
Sortable.findById(id)
  .then((object) => {
    object.property += 5
    return object.save()
  })
  .then(doSomething)
```
```js
Sortable.findByIdAndUpdate(
  id,
  { $inc: { property: 5 } },
  {
    new: true,
  })
  .then(doSomething)
```

The second snippet is better for several reasons.

1. What happens when multiple people make a request?
2. How many requests are made in each of them?

### Database Queries

- Get data the way you want quickly, and efficiently
- Do difficult operations off of the server, since the database is fast af
- Example: Sorting on the database

```js
Sortable.find({})
  .sort({ field: -1 })
  .then(doSomething)
```

```js
function sort(array, options) { /* hidden */}

Sortable.find({})
  .then((found) => {
    return sort(found, { field: -1 })
  })
  .then(doSomething)
```

Again, the second snippet is better.

1. What happens when you sort on a server that only has one thread?
2. Why not use the database that is optimized for this?

### Pagination

- Loading the next items in a set
- There are multiple ways to do this: Skipping, and Ranged Queries
- Example: Loading by date

### Aggregation Pipelines

- Get data suited for more advanced needs
- Again, it is faster to do some operations on the database
- Example: Getting the 10 most recent, highest rated items

```js
function getObjectValue(obj) {
  return (obj.field / obj.dateField)
}

function sort(array, funcThatDeterminesOrder) { /* hidden */ }

Sortable.find({})
  .then((data) => {
    const sorted = sort(array, getObjectValue).slice(0, 10)
    doSomething()
  })
```

```js
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
  .then(doSomething)
```

