const cassandra = require('cassandra-driver');
const assert = require('assert');

const loadBalancingPolicy = new cassandra.policies.loadBalancing.RoundRobinPolicy ();

const client = new cassandra.Client({ 
  contactPoints: ['172.17.0.2'],
  keyspace: 'dbzbay',
  policies : { loadBalancing : loadBalancingPolicy }
});

client.connect(function (err) {
  console.log('connected!');
  assert.ifError(err);
  client.shutdown(() => console.log('shut down'));
});
