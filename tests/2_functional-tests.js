const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let bookid

suite('Functional Tests', () => {

//  test('#example Test GET /api/books', (done) => {
//     chai
//       .request(server)
//       .get('/api/books')
//       .end((err, res) => {
//         assert.equal(res.status, 200);
//         assert.isArray(res.body, 'response should be an array');
//         assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
//         assert.property(res.body[0], 'title', 'Books in array should contain title');
//         assert.property(res.body[0], '_id', 'Books in array should contain _id');
//         done();
//       });
//   });
 
  suite('Routing tests', () => {


    suite('POST /api/books with title => create book object/expect book object', () => {

      test('Test POST /api/books with title', (done) => {
        chai
          .request(server)
          .post('/api/books')
          .send({
            title: "title"
          })
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.body.title, "title")
            bookid = res.body._id
            done()
          })
      })

      test('Test POST /api/books with no title given', (done) => {
        chai
          .request(server)
          .post('/api/books')
          .send({
            title: undefined
          })
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.body.title, undefined)
            done()
          })
      })
    })


    suite('GET /api/books => array of books', () => {

      test('Test GET /api/books', (done) => {
        chai
          .request(server)
          .get('/api/books')
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.isArray(res.body, "Array of books")
            done()
          })
      })
    })


    suite('GET /api/books/[id] => book object with [id]', () => {

      test('Test GET /api/books/[id] with id not in db', (done) => {
        chai
          .request(server)
          .get('/api/books/invalidId')
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.text, "no book exists")
            done()
          })
      })

      test('Test GET /api/books/[id] with valid id in db', (done) => {
        chai
          .request(server)
          .get('/api/books/' + bookid)
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.body.title, 'title')
            done()
          })
      })
    })


    suite('POST /api/books/[id] => add comment/expect book object with id', () => {

      test('Test POST /api/books/[id] with comment', (done) => {
        chai
          .request(server)
          .post('/api/books/' + bookid)
          .send({
            comment: "Many comments"
          })
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.body.comments, "Many comments")
            done()
          })
      })

      test('Test POST /api/books/[id] without comment field', (done) => {
        chai
          .request(server)
          .post('/api/books/' + bookid)
          .send({
            comment: undefined
          })
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.body.comments, undefined)
            done()
          })
      })

      test('Test POST /api/books/[id] with comment, id not in db', (done) => {
        chai
          .request(server)
          .post('/api/books/' + "invalidId")
          .send({
            comment: "Many comments"
          })
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.body.comments, undefined)
            done()
          })
      })
    })

    suite('DELETE /api/books/[id] => delete book object id', () => {

      test('Test DELETE /api/books/[id] with valid id in db', (done) => {
        chai
          .request(server)
          .delete('/api/books/' + bookid)
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.text, 'delete successful')
            done()
          })
      })

      test('Test DELETE /api/books/[id] with  id not in db', (done) => {
        chai
          .request(server)
          .delete('/api/books/' + "invalidId")
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.text, "no book exists")
            done()
          })
      })
    })
  })
})