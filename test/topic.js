const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiLike = require('chai-like');
const chaiThings = require('chai-things');
const mocha = require('mocha');
const uniqid = require('uniqid');
const app = require('../app');

const { expect } = chai;

chai.use(chaiHttp);
chai.use(chaiLike);
chai.use(chaiThings);

const id = null;
let ids = null;

mocha.describe('Testing Failed Routes', () => {
  mocha.it('Create Topic', (done) => {
    chai.request(app)
      .post('/create')
      .send({
        id: uniqid(),
        title: 'Testing topicLorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consequat sapien ex, quis mattis mi faucibus a. Nulla blandit fermentum justo, sit amet consequat purus semper vel. Vestibulum quis scelerisque eros. Aenean in placerat lectus, ac mattis mi.',
        upVote: 0,
        downVote: 0,
      })
      .end((err, res) => {
        expect(res.body).to.have.property('success', false);
        expect(res.body).to.have.property('message', 'Max character is no more than 255');
        done();
      });
  });
  mocha.it('Up Vote Topic', (done) => {
    chai.request(app)
      .put(`/upvote/${id}`)
      .end((err, res) => {
        expect(res.body).to.have.property('success', false);
        expect(res.body).to.have.property('message', 'Topic Id not found');
        done();
      });
  });
  mocha.it('Down Vote Topic', (done) => {
    chai.request(app)
      .put(`/downvote/${id}`)
      .end((err, res) => {
        expect(res.body).to.have.property('success', false);
        expect(res.body).to.have.property('message', 'Topic Id not found');
        done();
      });
  });
  mocha.it('Show Topic That Has Been Sorted', (done) => {
    chai.request(app)
      .get('/showtopics')
      .end((err, res) => {
        expect(res.body).to.have.property('success', false);
        expect(res.body).to.have.property('message', 'Please Insert a Topic First');
        done();
      });
  });
});

mocha.describe('Testing Success Routes', () => {
  mocha.it('Create Topic', (done) => {
    chai.request(app)
      .post('/create')
      .send({
        id: uniqid(),
        title: 'Testing topic',
        upVote: 0,
        downVote: 0,
      })
      .end((err, res) => {
        expect(res.body).to.have.property('success', true);
        expect(res.body).to.have.property('message', 'New Topic Created');
        expect(res.body).to.have.property('data').to.be.an('object');
        ids = res.body.data.id;
        done();
      });
  });
  mocha.it('Up Vote Topic', (done) => {
    chai.request(app)
      .put(`/upvote/${ids}`)
      .end((err, res) => {
        expect(res.body).to.have.property('success', true);
        expect(res.body).to.have.property('message', 'Up Vote Success');
        done();
      });
  });
  mocha.it('Down Vote Topic', (done) => {
    chai.request(app)
      .put(`/downvote/${ids}`)
      .end((err, res) => {
        expect(res.body).to.have.property('success', true);
        expect(res.body).to.have.property('message', 'Down Vote Success');
        done();
      });
  });
  mocha.it('Show Topic That Has Been Sorted', (done) => {
    chai.request(app)
      .get('/showtopics')
      .end((err, res) => {
        expect(res.body).to.have.property('success', true);
        expect(res.body).to.have.property('message', 'Show Database, Sort by Upvote Descending');
        done();
      });
  });
});
