## Scalability with Nodejs and MongoDB

 Async non blocking

    - Multiple requests or actions at the same time
    - Speed of doing them at the same time
    - Example: The Shopify application task, multiple calls at the same time

  Atomic DB Actions

    - Lower the amount of requests made, and reduce waiting
    - Eliminate the chance of race conditions, or operating on out of date values
    - Example: Increasing a value by finding it, vs increasing a value by findbyid and update

  DB Queries

    - Get data the way you want quickly, and efficiently
    - Do difficult operations off of the server, since the database is fast af
    - Example: ?

  Aggregate pipeline (advanced queries) 

    - Get data suited for more advanced needs
    - Again, it is faster to do some operations on the database
    - Example: Sorting by a projected value
