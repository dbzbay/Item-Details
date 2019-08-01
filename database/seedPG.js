require('dotenv').config()
const cassandra = require('cassandra-driver');
// const dbNodes = process.env.CNODES.split(' ');
const dbNodes = process.env.AWSCNODES.split(' ');
const faker = require('faker');

const loadBalancingPolicy = new cassandra.policies.loadBalancing.RoundRobinPolicy ();
// var authProvider = new cassandra.auth.PlainTextAuthProvider('cassandra', 'cassandra'); 
 const client = new cassandra.Client({ 
   contactPoints: dbNodes.slice(0, 2),
   keyspace: 'dbzbay',
   policies : { loadBalancing : loadBalancingPolicy}
 });

// client.connect((err)=>{
//   if(err) console.log(err);
//   console.log('connected!');
//   client.shutdown();
// })
client.connect(async ()=>{
  let today = new Date();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  console.log('start', time);
  for (let i = 0; i < 5000; i++){
    const values = [];
    for (let j = 0; j < 2000; j++){
      values.push([
        (j + (i * 2000) + 1),
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
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await cassandra.concurrent.executeConcurrent(client, queryString, values, { concurrencyLevel: 4000 });
  }
  client.shutdown(()=> {
    today = new Date();
    time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log('finished', time);
  });
})

