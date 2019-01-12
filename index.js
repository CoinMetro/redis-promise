const redis = require('redis');
const Bluebird = require('bluebird');
require('dotenv').config();

const config = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  path: process.env.REDIS_PATH || null,
  url: process.env.REDIS_URL || null
}

Bluebird.promisifyAll(redis.RedisClient.prototype);
Bluebird.promisifyAll(redis.Multi.prototype);

const subscriber = redis.createClient(config);
const dataClient = redis.createClient(config);

dataClient.on("error", err =>console.log("RESDIS dataClient error:", err));
subscriber.on("error", err =>console.log("REDIS subscriber error:", err));

module.exports = { dataClient, subscriber }
