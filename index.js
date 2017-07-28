const Amqp = require('amqplib/callback_api')

const isFunction = (value) => typeof value === 'function'

module.exports = (url, opts, done) => {
  if (isFunction(url)) [url, opts, done] = [null, {}, url]
  if (isFunction(opts)) [opts, done] = [{}, opts]

  Amqp.connect(url, opts, function (err, conn) {
    if (err) return done(err)

    const closeConnection = (err) => {
      conn.close()
      done(err)
    }

    conn.createChannel(function (err, ch) {
      if (err) closeConnection(err)
      else done(null, ch, conn)
    })
  })
}
