// utils/redis.js
import { createClient } from 'redis';

class RedisClient {
    constructor() {
        this.client = createClient();
        this.client.on('error', (err) => {
            console.error('client not connected to the server:', err);
        });
    }
    isAlive() {
        return this.client.connected;
    }

    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, value) => {
                resolve(value);
            });
        });
    }

    async set(key, value, duration) {
        return new Promise((resolve, reject) => {
            this.client.set(key, value, 'EX', duration, (err) => {
                if (err) {
                    console.error('Error setting key in Redis:', err);
                    return reject(err);
                }
                resolve();
            });
        });
    }

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
