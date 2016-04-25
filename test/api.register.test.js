import supertest from 'supertest'
import test from 'tape'

const request = supertest('http://localhost:1337')
const opts = {timeout: 2000}

const rnd = Math.random().toString().slice(2, 8)
const TEST_USER = {'name': 'John Doe', 'email': `test@test-${rnd}.com`, 'password': 'Shhh-Super-Secret'}

var authResult = null;

test('can register', opts, assert => {
  assert.plan(2)
  request.post('/auth/register')
    .send(TEST_USER)
    .set('Accept', 'application/json')
    .expect(function(res) {
      console.error('RESP:', res.body)
      assert.ok(res, 'res must be returned from HTTP call')
      assert.ok(res.body.id, 'id returned in signup response')
      authResult = res.body;
      //assert.pass('sucessfully created new user')
    })
    .expect(200, () => assert.end())
})

test('can fail on duplicate email signup', opts, assert => {
  assert.plan(2)
  request.post('/auth/register')
    .send(TEST_USER)
    .set('Accept', 'application/json')
    .expect(function(res) {
      // console.error('RESP:', res.body)
      assert.ok(res, 'res must be returned from HTTP call')
      assert.ok(res.body.error, 'Error expected on duplicate signup')
    })
    .expect(403, () => assert.end())
})

test('can cleanup/delete test user', opts, assert => {
  let user = authResult && authResult.user;
  console.warn('authResult', user && user.id)
  assert.plan(2);
  request.delete(`/user/${user && user.id}`)
    .set('Accept', 'application/json')
    .expect(function(res) {
      console.error('DELETE RESP:', res, arguments)
      assert.ok(res, 'res must be returned from HTTP call')
      assert.equal(authResult.id, res.body.id, 'id of deleted user must match requested id')
    })
    .expect(200, () => assert.end())
    // .end((err, res) => {
    //   if (err) console.error('\nerr', err, err.stack);
    //   console.error('\nres', res);
    //   assert.end(err)
    // })
    // .expect(200, () => assert.end())
})
