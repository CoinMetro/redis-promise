const redis = require('redis');
const Bluebird = require('bluebird');

Bluebird.promisifyAll(redis.RedisClient.prototype);
Bluebird.promisifyAll(redis.Multi.prototype);

const subscriber = redis.createClient();
const dataClient = redis.createClient();

module.exports = {
  dataClient,
  subscriber,
  TO_CHILDREN_CHANNEL: 'TO_CHILDREN',
  TO_CORE_CHANNEL: 'TO_CORE'
};
