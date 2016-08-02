const Code = require('code');
const Lab = require('lab');
const Proxyquire = require('proxyquire');
const Sinon = require('sinon');

const lab = exports.lab = Lab.script();

const describe = lab.describe;
const afterEach = lab.afterEach;
const beforeEach = lab.beforeEach;
const it = lab.it;
const expect = Code.expect;

const Channel = { test: true };
const Connection = {
  createChannel: Sinon.stub().yields(null, Channel)
};
const Amqp = {
  connect: Sinon.stub().yields(null, Connection)
};

const RabbitChannel = Proxyquire('..', {
  'amqplib/callback_api': Amqp
});

describe('RabbitChannel', function () {
  var error, url, opts;

  beforeEach(function (done) {
    error = null;
    url = 'http://local.docker';
    opts = {};
    done();
  });

  it('yeilds a channel and connection', function (done) {
    RabbitChannel(url, opts, function (err, ch, conn) {
      expect(err).to.not.exist();
      expect(ch).to.equal(Channel);
      expect(conn).to.equal(Connection);
      done();
    });
  });

  describe('when connection fails', function () {
    beforeEach(function (done) {
      error = new Error('Amqp.connect Error');
      Amqp.connect.yields(error);
      done();
    });

    afterEach(function (done) {
      Amqp.connect.yields(null, Connection);
      done();
    });

    it('yields an error', function (done) {
      RabbitChannel(url, opts, function (err, ch, conn) {
        expect(err).to.equal(error);
        expect(ch).to.not.exist();
        expect(conn).to.not.exist();
        done();
      });
    });
  });

  describe('when can not create channel', function () {
    beforeEach(function (done) {
      error = new Error('Connection.createChannel Error');
      Connection.createChannel.yields(error);
      done();
    });

    afterEach(function (done) {
      Connection.createChannel.yields(null, Channel);
      done();
    });

    it('yields an error', function (done) {
      RabbitChannel(url, opts, function (err, ch, conn) {
        expect(err).to.equal(error);
        expect(ch).to.not.exist();
        expect(conn).to.not.exist();
        done();
      });
    });
  });
});
