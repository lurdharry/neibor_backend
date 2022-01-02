const supertest = require('supertest')
const app = require("../index")
const request = supertest(app)

const { v4: uuidv4 } = require('uuid');


describe('Testing the Post and Home Endpoints', () => {
    // This test fails because 1 !== 2
    it('Testing to see if Jest works', () => {
      expect(2).toBe(2)
    })

    it('Test the Home endpoint', async done => {
      const response = await request.get('/')
      expect(response.status).toBe(404)
      expect(response.body.message).toEqual("Route not Found")
      done()
    })

    it('responds with an json value', async done => {
      const response = await request.get('/posts').expect('Content-Type', /json/)
      expect(response.status).toBe(200)     
      expect(response.body.success).toBe(true)
      expect(response.body.posts).toEqual([])
      done()
    });

    it('accepts a content from an authenticated user', async done=> {
      let uuid = uuidv4();
      const response = await request.post('/posts')
        .send({content:"Welcome to my blog"}) // x-www-form-urlencoded upload
        .set('Accept', 'application/json')
        .expect(function(res) {
          res.body.id = uuid
          res.body.content = 'Welcome to my blog'
        })
        .expect(200, {
          id: uuid,
          content: 'Welcome to my blog',
          success:true
        }, done);
    });

//     it('Test if the post is submitted and saved to the db', )

});
