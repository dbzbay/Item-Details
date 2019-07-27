require('dotenv').config();

const { Pool, Client } = require('pg');

const pool = new Pool({max: 50});

module.exports.pool = pool;

module.exports.get = async function(id){
  let client = await pool.connect();
  return client.query('select * from products where id=$1', [Number(id)])
  .then(res => {
    client.release();
    return res.rows[0]
  })
  .catch(err => {
    console.log(err);
    console.error(err)
  })
}

