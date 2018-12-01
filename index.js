const Redis = require('ioredis');
require('dotenv').config();

Redis.Pipeline.prototype.execClean = function () {
  return this.exec()
    .then(res => {
      for (let i = 0; i < res.length; i++)
        res[i] = res[i][1];
      return res;
    });
}

const subscriber = new Redis(process.env.REDIS_URL || "redis://localhost:6379");
const dataClient = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

module.exports = { dataClient, subscriber }
