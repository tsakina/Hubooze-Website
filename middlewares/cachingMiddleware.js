const redis = require('redis');
const client = redis.createClient();
const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const cacheMiddleware = async (req, res, next) => {
  const key = req.originalUrl;
  const cachedData = await getAsync(key);
  if (cachedData) {
    return res.json(JSON.parse(cachedData));
  }
  res.sendResponse = res.json;
  res.json = (body) => {
    setAsync(key, JSON.stringify(body), 'EX', 3600); // Cache for 1 hour
    res.sendResponse(body);
  };
  next();
};

module.exports = cacheMiddleware;
