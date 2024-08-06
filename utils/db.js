// utils/db.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Class representing a MongoDB client.
 */
class DBClient {
  /**
   * Creates an instance of DBClient and initializes the MongoDB client.
   */
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;

    this.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    this.client.connect()
      .then(() => {
        this.db = this.client.db(database);
      });
  }

  /**
   * Checks if the MongoDB client is connected.
   * @returns {boolean} - True if the client is connected, false otherwise.
   */
  isAlive() {
    return this.client && this.client.isConnected();
  }

  /**
   * Retrieves the number of users in the 'users' collection.
   * @returns {Promise<number>} - A promise that resolves to the number of users.
   */
  async nbUsers() {
    if (!this.db) return 0;
    return this.db.collection('users').countDocuments();
  }

  /**
   * Retrieves the number of files in the 'files' collection.
   * @returns {Promise<number>} - A promise that resolves to the number of files.
   */
  async nbFiles() {
    if (!this.db) return 0;
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
