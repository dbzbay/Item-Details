require('dotenv').config()
const cassandra = require('cassandra-driver');
const dbNodes = process.env.CNODES.split(' ');

const loadBalancingPolicy = new cassandra.policies.loadBalancing.RoundRobinPolicy ();

const client = new cassandra.Client({ 
  contactPoints: dbNodes,
  keyspace: 'dbzbay',
  policies : { loadBalancing : loadBalancingPolicy }
});

client.connect(function (err) {
  console.log('connected!');
  assert.ifError(err);
  client.shutdown(() => console.log('shut down'));
});
