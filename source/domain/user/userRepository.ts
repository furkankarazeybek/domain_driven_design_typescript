import { MongoClient } from 'mongodb';
require('dotenv').config();


export class UserRepository {
  private client: MongoClient;
  private dbName = 'usersDb';
  private collectionName = 'usersCollection';

  constructor() {
    this.client = new MongoClient(process.env.USER_DB_URI || "" );
  }

  async findAll() {
    await this.client.connect();
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);
    return await collection.find().toArray();
  }

  async create(productData: any) {
    try {
      await this.client.connect();
      const db = this.client.db(this.dbName);
      const collection = db.collection(this.collectionName);
      await collection.insertOne(productData);
    } catch (error) {
      console.error('Error while inserting user:', error);
      throw error; 
    }
  }

  
}
