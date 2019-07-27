const app = require('./server');
const port = process.env.PORT || 3002;
const host = process.env.HOST || 'localhost';

app.listen(port, () => {
  console.log(`Baby I'm listening, ${port}`);
});