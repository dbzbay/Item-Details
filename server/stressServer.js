const axios = require('axios');

for (let i = 1; i < 1000; i++){
  axios.get('http://localhost:3002/item/' + i)
  .then(res => console.log(res))
  .catch(err => console.error(err))
}