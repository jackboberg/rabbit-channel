const { expect } = require('code')
const Lab = require('lab')
const Proxyquire = require('proxyquire')
const Sinon = require('sinon')

const { describe, it, afterEach, beforeEach } = exports.lab = Lab.script()

const Amqp = { connect: Sinon.stub() }
const Channel = { test: true }
const Connection = {
  createChannel: Sinon.stub(),
  close: Sinon.stub()
}

const RabbitChannel = Proxyquire('..', {
  'amqplib/callback_api': Amqp
})

describe('RabbitChannel', () => {
  let error, url, opts

  beforeEach((done) => {
    error = null
    url = 'http://local.docker'
    opts = {}
    Amqp.connect.yields(null, Connection)
    Connection.createChannel.yields(null, Channel)
    done()
  })

  afterEach((done) => {
    Amqp.connect.reset()
    Connection.createChannel.reset()
    Connection.close.reset()
    done()
  })

  describe('when passed only a callback', () => {
    it('yields a channel and connection', (done) => {
      RabbitChannel((err, ch, conn) => {
        expect(err).to.not.exist()
        expect(ch).to.equal(Channel)
        expect(conn).to.equal(Connection)
        expect(Amqp.connect.calledWith(null, {})).to.be.true()
        done()
      })
    })
  })

  describe('when passed a url and callback', () => {
    it('yields a channel and connection', (done) => {
      RabbitChannel(url, (err, ch, conn) => {
        expect(err).to.not.exist()
        expect(ch).to.equal(Channel)
        expect(conn).to.equal(Connection)
        expect(Amqp.connect.calledWith(url, {})).to.be.true()
        done()
      })
    })
  })

  describe('when passed a url, options, and callback', () => {
    it('yields a channel and connection', (done) => {
      RabbitChannel(url, opts, (err, ch, conn) => {
        expect(err).to.not.exist()
        expect(ch).to.equal(Channel)
        expect(conn).to.equal(Connection)
        expect(Amqp.connect.calledWith(url, opts)).to.be.true()
        done()
      })
    })
  })

  describe('when connection fails', () => {
    beforeEach((done) => {
      error = new Error('Amqp.connect Error')
      Amqp.connect.yields(error)
      done()
    })

    it('yields an error', (done) => {
      RabbitChannel(url, opts, (err) => {
        expect(err).to.equal(error)
        done()
      })
    })
  })

  describe('when can not create channel', () => {
    beforeEach((done) => {
      error = new Error('Connection.createChannel Error')
      Connection.createChannel.yields(error)
      done()
    })

    it('yields an error', (done) => {
      RabbitChannel(url, opts, (err) => {
        expect(err).to.equal(error)
        expect(Connection.close.called).to.be.true()
        done()
      })
    })
  })
})
