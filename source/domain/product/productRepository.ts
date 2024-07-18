import axios from 'axios';
import { MongoClient, ObjectId } from 'mongodb';
require('dotenv').config();

export class ProductRepository {
  private client: MongoClient;
  private dbName = 'productsDb';
  private collectionName = 'productsCollection';




  constructor() {
    this.client = new MongoClient(process.env.USER_DB_URI || "");
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
      console.error('Error while inserting product:', error);
      throw error; 
    }
  }


  async findProductsByIds(productIds: string[]) {
    await this.client.connect();
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);

    return collection;

  }




}


