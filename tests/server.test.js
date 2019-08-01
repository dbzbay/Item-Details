const request = require('supertest');
const app = require('../server/server.js');
const Product = require('../database/index.js');


describe('the /item/:id endpoint', () => {
  // afterEach(async (done) => {
  //   setImmediate(done);
  // });
  // 
  afterAll(async done =>{
    done();
  });

  test('responds with json', done => {
    let id;
    if (process.env.ENV === 'travis'){
      id = 1;
    }else{
      id = String(Math.floor(Math.random() * 10000000)).padStart(8, '0');
    }
    return request(app).get(`/item/${id}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(typeof res.body).toBe('object');
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('price');
        expect(res.body).toHaveProperty('image');
        expect(res.body).toHaveProperty('seller_name');
        expect(res.body).toHaveProperty('seller_score');
        expect(res.body).toHaveProperty('seller_feedback');
        expect(res.body).toHaveProperty('condition');
        expect(res.body).toHaveProperty('category');
        done();
      })
  });

  test('handles a high volume of valid requests', done => {
    const range = [...Array(1000).keys()];
    return Promise.all(
      range.map(i => request(app).get(`/item/random`))
      )
      .then(resArray => {
        expect(resArray.length).toBe(1000);
        done()
      })
  });
  if (process.env.ENV !== 'travis'){
    test('responds appropriately to unknown ids', done => {
      return request(app).get(`/item/not_an_id`)
        .expect(404)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(typeof res.body).toBe('object');
          expect(res.body).toHaveProperty('message');
          expect(res.body.message).toBe('Can\'t find that, sorry.');
          done();
        })
    });
  }
});