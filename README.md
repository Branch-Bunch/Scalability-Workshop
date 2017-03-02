## Scalability with Nodejs and MongoDB


  Async non blocking

    - Multiple requests or actions at the same time
    - Speed of doing them at the same time
    - Example: The Shopify application task, multiple calls at the same time

  Atomic DB Actions

    - Lower the amount of requests made, and waiting
    - Eliminate the chance of race conditions, or operating on bad values
    - Example: Increasing a value by finding it, vs increasing a value by findbyid and update

  DB Queries

    - Get data the way you want quickly, and efficiently
    - Do difficult operations off of the server

  Aggregate pipeline (advanced queries) 

    - Get data suited for more advanced needs
