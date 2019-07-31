require('dotenv').config()
const cassandra = require('cassandra-driver');
const dbNodes = process.env.CNODES.split(' ');

const loadBalancingPolicy = new cassandra.policies.loadBalancing.RoundRobinPolicy ();

const client = new cassandra.Client({ 
  contactPoints: dbNodes,
  keyspace: 'dbzbay',
  policies : { loadBalancing : loadBalancingPolicy }
});

module.exports.get = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  return client.execute(query, [ id ], { prepare: true })
    .then(data => data.rows[0])
}
