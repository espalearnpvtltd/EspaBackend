import { createClient } from 'redis';

let redisClient;
let redisConnected = false;

export const initializeRedis = async () => {
  try {
    const redisUrl = process.env.REDIS_URL || `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`;
    
    redisClient = createClient({
      url: redisUrl,
      socket: {
        reconnectStrategy: false // Disable auto-reconnect to stop spam logs
      }
    });

    redisClient.on('error', (err) => {
      if (!redisConnected) {
        console.warn('⚠️ Redis not available - continuing without cache');
        redisConnected = false;
      }
    });
    
    redisClient.on('connect', () => console.log('✅ Redis Connected'));
    redisClient.on('ready', () => {
      console.log('✅ Redis Ready');
      redisConnected = true;
    });

    await redisClient.connect();
  } catch (err) {
    console.warn('⚠️ Redis Connection Error - continuing without cache:', err.message);
    redisConnected = false;
  }
};

// Get value from cache
export const getCache = async (key) => {
  try {
    if (!redisClient || !redisConnected) return null;
    const value = await redisClient.get(key);
    if (value) {
      console.log(`✅ Cache HIT: ${key}`);
      return JSON.parse(value);
    }
    return null;
  } catch (err) {
    console.error('Cache Get Error:', err);
    return null;
  }
};

// Set value in cache with TTL (Time To Live)
export const setCache = async (key, value, ttl = 3600) => {
  try {
    if (!redisClient || !redisConnected) return;
    await redisClient.setEx(key, ttl, JSON.stringify(value));
    console.log(`✅ Cache SET: ${key} (TTL: ${ttl}s)`);
  } catch (err) {
    console.error('Cache Set Error:', err);
  }
};

// Delete cache
export const deleteCache = async (key) => {
  try {
    if (!redisClient || !redisConnected) return;
    await redisClient.del(key);
    console.log(`✅ Cache deleted: ${key}`);
  } catch (err) {
    console.error('Cache Delete Error:', err);
  }
};

// Clear all cache
export const clearAllCache = async () => {
  try {
    if (!redisClient || !redisConnected) return;
    await redisClient.flushAll();
    console.log('✅ All cache cleared');
  } catch (err) {
    console.error('Cache Clear Error:', err);
  }
};

export default redisClient;
