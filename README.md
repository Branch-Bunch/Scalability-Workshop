# Scaling Database Queries with Nodejs and MongoDB

What we'll be covering:

1. [Atomic Database Actions](#atomic-database-actions)
2. [Database Queries](#useful-database-queries)
3. [Pagination](#pagination)
4. [Aggregation Pipelines](#aggregation-pipelines)

### Setting up your environment
See [setup.md](https://github.com/Branch-Bunch/Scalability-Workshop/blob/master/setup.md)

1. Download Nodejs, MongoDB
2. Run mongod (running as root makes it easier)
3. Git clone this repo
4. ```npm run build```
5. ```npm test```


### Atomic Database Actions

- Lower the amount of requests made, and reduce waiting
- Eliminate the chance of race conditions, or operating on out of date values

Example: Increasing a property of an object with a specific id

Bad method:
```
Find object by id, get from database
Modify object on the server
Send updated object to database
Do something after the response
```
<details><summary>Reveal Bad Implementation</summary>
```js
Sortable.findById(id)
  .then((object) => {
    object.property += 5
    return object.save()
  })
  .then(doSomething)
```
</details>

<details><summary>Reveal Good method</summary>
```
Tell the database to increment a certain property of object #id, and respond with the updated object
Do something after the response
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
</details>

Things to consider:

1. What happens when multiple people make a request?
2. How many requests are made in each of them?

<details><summary>Reveal Answer</summary>

1. Atomic actions ensure that the proper data is being modified the proper amount
2. Finding, modifying, then saving is 2, while finding and updating on the database is just 1

![Having two networking requests race can cause a race condition](/img/race-condition.png)

</details>

### Useful Database Queries

- Get data the way you want quickly, and efficiently
- Do difficult operations off of the server, since the database is fast af

Example: Getting the top 10 Anime betrayals from a database of Anime episodes

Bad method:

```
Get all of the items from the database
Sort them
Pass on the first 10 items
Make a video with them
```
<details><summary>Reveal Bad Implementation</summary>

```js
function comparison(first, second) {
  // compare the anime episodes
  // sort will order them all
}

AnimeEpisodes.find({})
  .then(animeArray => animeArray.sort(comparison).slice(0, 10)))
  .then(makeVideo)
```
</details>

<details><summary>Reveal Good method</summary>
```
Tell the database to give you the first 10 elements of the sorted array
Do something with the sorted data
```

```js
AnimeEpisodes.find({})
  .sort({ betrayal: -1 })
  .limit(10)
  .then(makeVideo)
```
</details>

Things to consider:

1. What happens when you sort on a server that only has one thread?
2. Why not use the database that is optimized for this?

<details><summary>Reveal Answer</summary>

1. Sorting blocks the entire process, and makes things slow
2. Might as well use the database as it does it in a faster method.

</details>

### Pagination

- Loading the next items in a set
- There are multiple ways to do this: Skipping, and Ranged Queries
- Example: Loading by date

### Aggregation Pipelines

- Get data suited for more advanced needs.
- Common use is when sorting by a single value isn't enough
- Again, it is faster to do some operations on the database

Example: Getting the 10 most dank memes, where dankness is how recent, and highly voted they are

Bad method:

```
Get all memes from the database
Sort them using a function to determine their dankness, instead of a simple property
Pass on the first 10 memes
Post the memes
```

<details><summary>Reveal Bad Implementation</summary>
```js
function getDankness(meme) {
  // divides score by how old it is
  return (meme.score / meme.dateField.getTime())
}

function comparison(first, second) {
  // use getDankness to return 1 or -1 for sort to order the memes
}

Memes.find({})
  .then(memesList => sort(array, getObjectValue).slice(0, 10))
  .then(postMemes)
```
</details>

<details><summary>Reveal Good Method</summary>
```
Add a temporary field to each of the memes named dankness, and calculate it
Sort all of the memes by dankness, on the database still
Respond to the server with the 10 dankest memes
Post the memes
```

```js
Memes.aggregate([
  {
    $project: {
      score: '$score',
      value: '$value',
      dankness: {
        $divide: [ '$score', '$value' ]
      }
    }
  },
  { 
    $sort: { dankness: -1} 
  },
])
  .limit(10)
  .then(postMemes)
```
</details>

Things to consider:

1. Is the data in the database modified?

<details><summary>Reveal Answers</summary>
1. The fields you add are temporary, so it is a good solution
Again, sorting on the database is a good solution in this example
</details>
