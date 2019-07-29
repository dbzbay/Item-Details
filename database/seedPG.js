const cassandra = require('cassandra-driver');
const faker = require('faker');
// const assert = require('assert');

const loadBalancingPolicy = new cassandra.policies.loadBalancing.RoundRobinPolicy ();

const client = new cassandra.Client({ 
  contactPoints: ['172.17.0.2'],
  keyspace: 'dbzbay',
  policies : { loadBalancing : loadBalancingPolicy }
});

(async function() {
  for (let i = 0; i < 5000; i++){
    const values = [];
    for (let j = 0; j < 2000; j++){
      values.push([
        (j + (i * 2000)),
        faker.commerce.productName(),
        faker.finance.amount(0, 10000, 2),
        faker.image.imageUrl(),
        faker.internet.userName(),
        faker.random.number(10000),
        faker.finance.amount(0, 100, 1),
        faker.lorem.word(),
        faker.commerce.department()
      ])
    }
    let queryString = `INSERT INTO products(
        uid,
        ID,
        Name,
        Price,
        Image,
        Seller_Name,
        Seller_Score,
        Seller_Feedback,
        Condition,
        Category
      )
      VALUES(now(), ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const result = await cassandra.concurrent.executeConcurrent(client, queryString, values);
  }
  client.shutdown();
})()

