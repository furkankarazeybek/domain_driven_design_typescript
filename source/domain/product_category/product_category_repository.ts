import { MongoClient, ObjectId } from 'mongodb';
require('dotenv').config();

export class ProductCategoryRepository {
  private client: MongoClient;
  private dbName = 'productCategoriesDb';
  private collectionName = 'productCategoriesCollection';

  constructor() {
    this.client = new MongoClient(process.env.PRODUCT_CATEGORIES_DB_URI || "");
  }

  async findAll() {
    await this.client.connect();
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);
    return await collection.find().toArray();
  }

  async create(productCategory: any) {
    try {
      await this.client.connect();
      const db = this.client.db(this.dbName);
      const collection = db.collection(this.collectionName);
      await collection.insertOne(productCategory);
    } catch (error) {
      console.error('Error while inserting product:', error);
      throw error; 
    }
  }


  async findCategoriesByIds(categoryIds: string[]) {
    await this.client.connect();
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);

    return collection;
   
  }
  
}


