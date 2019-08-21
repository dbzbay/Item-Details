# Ecommerce System Design 
## Author
   * Zona Gilreath - https://github.com/zonagilreath
## You want scale? Alright let's scale 
The purpose of this project was to take an ecommerce backend service and proxy server which was originally only serving 100 resources, and supporting only a few dozen requests per second, and scale it both horizontally and vertically to serve at least 10,000,000 database resources, and over 100 requests per second. Using a combination of Apache’s Cassandra distributed database management system, a highly tuned Nginx proxy server running on AWS’s free ECS t2.micro server for static file service and load-balancing, and a round robin setup of four application servers, I was able to easily reach the 10,000,000 resources served, and managed to squeeze over 15000 rps out of the static file server and 3600 arbitrary (ie uncached, changing with every request) data/API rps. 

I can’t keep this project deployed, unfortunately, because the minimum system requirements for a Cassandra node cluster datastore are greater than what is possible on AWS’s free tier, and practically none of the code in this repository so I would like at least to explain a little about my choice to use Cassandra. I recognize that Cassandra is not the tool for most datastore use cases. I am a huge fan of both PostgreSQL and MongoDB, and in almost any situation that I’m likely to be in other than this experiment, one of those two will probably be the right tool. If nothing else, in most cases the consistency of data and the atomicity of queries on that data are of high importance, and for that both MongoDB and PostgreSQL provide great tools to ensure the safety and consistency of data, even across distributed datacenters. 

But there is, famously, a basically inverse relationship between consistency and availability in data storage, and it’s important to know what an app actually needs. For something like a back end service supplying things like product descriptions and urls for product images hosted elsewhere, this data is highly unlikely to change very frequently (by which I mean, multiple competing changes racing for the data within the same fraction of a second). Furthermore, all things considered, even when the data is changed for something like a product description, if a user gets the version from half a second ago, this is generally tolerable. So consistency and atomicity aren’t crucial to this service, and we’re free to explore options for maximal availability. 

Once I made this decision I looked into solutions like Redis and Elastic Search. Both of these are excellent tools. I even prototyped a Redis caching layer on the API, but ended up not having the time to implement it fully. The problem with both of these tools, however, is that with resource pools of the order of 10,000,000, they become unwieldy for the server and are generally not stable solutions as primary datastores because they are long running processes that need data to live continuously in memory.

Cassandra on the other hand turns out to be perfectly suited to these needs. Cassandra is built to maximize the ability of massive datasets by building horizontal partitioning and hashed indices into the data structure from the ground up. Cassandra nodes have what the developers called a gossip protocol, which means that you can add new nodes whenever and you need only point them to one already connected node and they will all find each other and, if you load balance the queries across the cluster like I did, they can learn rapidly where to direct incoming queries for data that is partitioned elsewhere in the cluster. This gossip protocol also provides a means of eventual consistency if you want your data to be replicated so that if any one node goes down, the full data set remains available. 

It’s a fascinating tool that allowed me to set up easily the coolest system architectures I ever have. I ended up using the leftover computing power of the beefier servers required by Cassandra to run an application server on integrate with each node. These servers received load-balanced requests from the single light-weight proxy server, and, on the off chance that that a massive number of requests came in for data on a single node/partition, each application server individually was set to offload its database queries to the next node in its ring of addresses.

I don’t know whether I’ll ever have the occasion to use Cassandra again, but I hope I do because it was really exciting to learn. The process taught me quite a bit about even the other DBMS I use and, more importantly, it taught me not to take all the common wisdom about these systems for granted and to find out for myself which of the available tools is truly the right one for the job at hand. 

