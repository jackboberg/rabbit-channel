# @modulus&#x2F;rabbit-channel

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/@modulus&#x2F;rabbit-channel.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@modulus&#x2F;rabbit-channel
[travis-image]: https://img.shields.io/travis/jackboberg/@modulus&#x2F;rabbit-channel.svg?style=flat-square
[travis-url]: https://travis-ci.org/jackboberg/@modulus&#x2F;rabbit-channel
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

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
npm install @modulus/rabbit-channel
```

## Usage

The exported function takes the same parameters as [`amqplib.connect`][amqplib],
and yields `channel` and `connection` objects.

```js
const RabbitChannel = require('@modulus/rabbit-channel')

RabbitChannel(url, options, (err, channel, connection) {
  if (err) throw err

  // have 
})
```

## Contributing

Contributions welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

[MIT](LICENSE.md)

[amqplib]: http://www.squaremobius.net/amqp.node/channel_api.html#connect
