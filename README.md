# @jackrabbit/channel

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]
[![semantic release][semantic-image]][semantic-url]

> wrapper for creating a rabbitMQ connection and opening a channel

It gets tedious to start every rabbit interaction with the same two function
calls:

```js
const Amqp = require('amqplib/callback_api')

Amqp.connect(url, options, (err, connection) => {
  if (err) throw err

  connection.createChannel((err, channel) => {
    if (err) throw err

    // ready to start actually scripting
  })
})
```

Additionally, using this module abstracts the dependency on `amqplib` (a little).

## Install

```
npm install @jackrabbit/channel
```

## Usage

The exported function takes the same parameters as [`amqplib.connect`][amqplib],
and yields `channel` and `connection` objects.

```js
const RabbitChannel = require('@jackrabbit/channel')

RabbitChannel(url, options, (err, channel, connection) {
  if (err) throw err

  // script away
})
```

## Contributing

Contributions welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

[MIT](LICENSE.md)

[npm-image]: https://img.shields.io/npm/v/@jackrabbit/channel.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@jackrabbit/channel
[travis-image]: https://img.shields.io/travis/jackboberg/rabbit-channel.svg?style=flat-square
[travis-url]: https://travis-ci.org/jackboberg/rabbit-channel
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[semantic-url]: https://github.com/semantic-release/semantic-release
[amqplib]: http://www.squaremobius.net/amqp.node/channel_api.html#connect
