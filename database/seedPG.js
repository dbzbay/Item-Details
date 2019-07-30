require('dotenv').config()
const { Pool, Client } = require('pg');
const faker = require('faker');

const pool = new Pool({max: 50});

(async function() {
    let client = await pool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
      ID SERIAL PRIMARY KEY,
      Name TEXT NOT NULL,
      Price numeric(10, 2) NOT NULL,
      Image TEXT NOT NULL,
      Seller_Name TEXT NOT NULL,
      Seller_Score INT NOT NULL,
      Seller_Feedback numeric(4,1) NOT NULL,
      Condition TEXT NOT NULL,
      Category TEXT NOT NULL
      );`);
    client.release();
  for (let i = 0; i < 10000; i++){
    const client = await pool.connect();
    const values = [];
    for (let i = 0; i < 1000; i++){
      values.push(
        faker.commerce.productName(),
        faker.finance.amount(0, 10000, 2),
        faker.image.imageUrl(),
        faker.internet.userName(),
        faker.random.number(10000),
        faker.finance.amount(0, 100, 1),
        faker.lorem.word(),
        faker.commerce.department()
      )
    }
    let queryString = `INSERT INTO products(
        Name,
        Price,
        Image,
        Seller_Name,
        Seller_Score,
        Seller_Feedback,
        Condition,
        Category
      )
      VALUES`;
    for (let i = 0; i < 1000; i++){
      if (i > 0) queryString += ',';
      queryString += `($${i * 8 + 1}, $${i * 8 + 2}, $${i * 8 + 3}, $${i * 8 + 4}, $${i * 8 + 5}, $${i * 8 + 6}, $${i * 8 + 7}, $${i * 8 + 8})`
    }
    queryString += ';'
    client.query(queryString, values)
    .catch(e => console.error(e.stack))
    .then(()=> client.release());
  }
  pool.end();
})()

