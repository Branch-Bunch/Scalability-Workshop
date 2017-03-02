## Scaling Database Queries with Nodejs and MongoDB

  Atomic DB Actions

    - Lower the amount of requests made, and reduce waiting
    - Eliminate the chance of race conditions, or operating on out of date values
    - Example: Increasing a value by finding it and saving it, vs increasing a value by findbyid and update

  DB Queries

    - Get data the way you want quickly, and efficiently
    - Do difficult operations off of the server, since the database is fast af
    - Example: Sorting on the database

  Aggregate pipeline (advanced queries) 

    - Get data suited for more advanced needs
    - Again, it is faster to do some operations on the database
    - Example: Sorting by a projected value on the database
