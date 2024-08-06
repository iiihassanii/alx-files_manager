// utils/redis.js
import { createClient } from 'redis';

/**
 * Class representing a Redis client.
 */
class RedisClient {
  /**
    * Creates an instance of RedisClient and initializes the Redis client.
   */
  constructor() {
      this.client = createClient();
      this.client.on('error', (err) => {
          console.error('client not connected to the server:', err);
      });
  }

  /**
    * Checks if the Redis client is connected.
    * @returns {boolean} - True if the client is connected, false otherwise.
    */
  isAlive() {
      return this.client.connected;
  }

  /**
    * Retrieves the value associated with the specified key from Redis.
    * @param {string} key - The key to retrieve the value for.
    * @returns {Promise<string|null>} - A promise that resolves to the value of the key, or null if the key does not exist.
    */
  async get(key) {
      return new Promise((resolve, reject) => {
          this.client.get(key, (err, value) => {
              if (err) {
                  console.error('Error getting value from Redis:', err);
                  return reject(err);
              }
              resolve(value);
          });
      });
  }

  /**
    * Sets a key-value pair in Redis with an expiration time.
    * @param {string} key - The key to set.
    * @param {string} value - The value to set.
    * @param {number} duration - The expiration time in seconds.
    * @returns {Promise<void>} - A promise that resolves when the key-value pair is set.
    */
  async set(key, value, duration) {
      return new Promise((resolve, reject) => {
          this.client.set(key, value, 'EX', duration, (err) => {
              if (err) {
                  console.error('Error setting value in Redis:', err);
                  return reject(err);
              }
              resolve();
          });
      });
  }

  /**
    * Deletes the key-value pair associated with the specified key from Redis.
   * @param {string} key - The key to delete.
   * @returns {Promise<void>} - A promise that resolves when the key is deleted.
    */
  async del(key) {
      return new Promise((resolve, reject) => {
          this.client.del(key, (err) => {
              if (err) {
                  console.error('Error deleting key from Redis:', err);
                  return reject(err);
              }
              resolve();
          });
      });
  }
}

const redisClient = new RedisClient();
export default redisClient;
