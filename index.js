const Amqp = require('amqplib/callback_api')

module.exports = (url, opts, done) => {
  if (isFunction(url)) [url, opts, done] = [null, {}, url]
  if (isFunction(opts)) [opts, done] = [{}, opts]

  Amqp.connect(url, opts, (err, conn) => {
    if (err) return done(err)

    const closeConnection = (err) => {
      conn.close()
      done(err)
    }

    conn.createChannel((err, ch) => {
      if (err) closeConnection(err)
      else done(null, ch, conn)
    })
  })
}

const isFunction = (value) => typeof value === 'function'
