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