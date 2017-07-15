const Code = require('code')
const Lab = require('lab')
const Proxyquire = require('proxyquire')
const Sinon = require('sinon')

const lab = exports.lab = Lab.script()

const describe = lab.describe
const afterEach = lab.afterEach
const beforeEach = lab.beforeEach
const it = lab.it
const expect = Code.expect

const Channel = { test: true }
const Connection = {
  createChannel: Sinon.stub().yields(null, Channel),
  close: Sinon.stub()
}
const Amqp = {
  connect: Sinon.stub().yields(null, Connection)
}

const RabbitChannel = Proxyquire('..', {
  'amqplib/callback_api': Amqp
})

describe('RabbitChannel', function () {
  var error, url, opts

  beforeEach(function (done) {
    error = null
    url = 'http://local.docker'
    opts = {}
    done()
  })

  afterEach(function (done) {
    Amqp.connect.reset()
    Connection.createChannel.reset()
    Connection.close.reset()
    done()
  })

  describe('when passed only a callback', function () {
    it('yields a channel and connection', function (done) {
      RabbitChannel(function (err, ch, conn) {
        expect(err).to.not.exist()
        expect(ch).to.equal(Channel)
        expect(conn).to.equal(Connection)
        expect(Amqp.connect.calledWith(null, {})).to.be.true()
        done()
      })
    })
  })

  describe('when passed a url and callback', function () {
    it('yields a channel and connection', function (done) {
      RabbitChannel(url, function (err, ch, conn) {
        expect(err).to.not.exist()
        expect(ch).to.equal(Channel)
        expect(conn).to.equal(Connection)
        expect(Amqp.connect.calledWith(url, {})).to.be.true()
        done()
      })
    })
  })

  describe('when passed a url, options, and callback', function () {
    it('yields a channel and connection', function (done) {
      RabbitChannel(url, opts, function (err, ch, conn) {
        expect(err).to.not.exist()
        expect(ch).to.equal(Channel)
        expect(conn).to.equal(Connection)
        expect(Amqp.connect.calledWith(url, opts)).to.be.true()
        done()
      })
    })
  })

  describe('when connection fails', function () {
    beforeEach(function (done) {
      error = new Error('Amqp.connect Error')
      Amqp.connect.yields(error)
      done()
    })

    afterEach(function (done) {
      Amqp.connect.yields(null, Connection)
      done()
    })

    it('yields an error', function (done) {
      RabbitChannel(url, opts, function (err) {
        expect(err).to.equal(error)
        done()
      })
    })
  })

  describe('when can not create channel', function () {
    beforeEach(function (done) {
      error = new Error('Connection.createChannel Error')
      Connection.createChannel.yields(error)
      done()
    })

    afterEach(function (done) {
      Connection.createChannel.yields(null, Channel)
      done()
    })

    it('yields an error', function (done) {
      RabbitChannel(url, opts, function (err) {
        expect(err).to.equal(error)
        expect(Connection.close.called).to.be.true()
        done()
      })
    })
  })
})
