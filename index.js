'use strict';

const redis = require('redis');
const Bluebird = require('bluebird');

Bluebird.promisifyAll(redis.RedisClient.prototype);
Bluebird.promisifyAll(redis.Multi.prototype);

const dataClient = redis.createClient();

module.exports = dataClient;
