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

redis.RedisClient.prototype.hsetAsyncSafe = function (...args) {
  if ((args || []).some(arg => arg === undefined || arg === null))
    console.error("BAD HSET INPUT", ...args);
  return this.hsetAsync(...args);
};

redis.Multi.prototype.hsetSafe = function (...args) {
  if ((args || []).some(arg => arg === undefined || arg === null))
    console.error("BAD HSET INPUT", ...args);
  return this.hset(...args);
};

const subscriber = redis.createClient(config);
const dataClient = redis.createClient(config);

dataClient.on("error", err => console.log("REDIS dataClient error:", err));
subscriber.on("error", err => console.log("REDIS subscriber error:", err));

module.exports = { dataClient, subscriber }
