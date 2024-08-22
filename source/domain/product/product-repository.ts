import {  injectable } from 'inversify';
import { ObjectId } from 'mongodb';
import { IProduct } from './product-model';
import { db } from '../../utils/db';

@injectable()
export class ProductRepository {
 
  private collectionName = 'products';

  async createProduct (product: IProduct) : Promise<IProduct> {
    const productCollection = db.collection(this.collectionName);
    return await productCollection.insertOne(product);
  };
  
  async findAllProducts ()  : Promise<IProduct[]>  {
    const productCollection = db.collection(this.collectionName);
    return await productCollection.find().toArray();
  };


  async deleteProduct(id: string): Promise<void> {
    const productCollection = db.collection(this.collectionName);
    const result = await productCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      throw new Error(`Product with ID ${id} not found`);
    }
  };



}
