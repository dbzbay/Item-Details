require('dotenv').config()
const fastify = require('fastify')({
  logger: true
})
const Product = require('../database/index');
const path = require('path')
const port = process.env.PORT || 3002;

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, '../dist'),
})

fastify.get("/item/random", (req, res, next) => {
  const id = Math.floor(Math.random() * 10000000);
  return Product.get(id)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
});

fastify.get("/item/:id", (req, res, next) => {
  const id = Number(req.params.id)
  if (isNaN(id)) next();
  return Product.get(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(port, '0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()