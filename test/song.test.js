const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');
chai.use(chaiHttp);

describe('/song tests', () => {
  describe('/add', () => {
    it('it should POST a song', (done) => {
      const song = {
        name: 'test1',
        artist: 'test2',
        emotion: 'test3',
        youtubeUrl: 'test4',
        spotifyUrl: 'test5',
      };

      chai
        .request(server)
        .post('/song/add')
        .send(song)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('song');
          res.body.song.should.have.property('_id');
          res.body.song.should.have.property('name').eql(song.name);
          res.body.song.should.have.property('artist').eql(song.artist);
          res.body.song.should.have.property('emotion').eql(song.emotion);
          res.body.song.should.have.property('youtubeUrl').eql(song.youtubeUrl);
          res.body.song.should.have.property('spotifyUrl').eql(song.spotifyUrl);
          res.body.song.should.have.property('created_at');
          done();
        });
    });
  });
});
