import {  injectable } from 'inversify';
import { ObjectId } from 'mongodb';
import { IProductCategories } from './product-category-model';
import { db } from '../../utils/db';

@injectable()
export class ProductCategoryRepository {
 
  private collectionName = 'productcategories';

  async createProduct (productCategory: IProductCategories) : Promise<IProductCategories> {
    const productCategoryCollection = db.collection(this.collectionName);
    return await productCategoryCollection.insertOne(productCategory);
  };
  
  async findAllProductCategories ()  : Promise<IProductCategories[]>  {
    const productCategoryCollection = db.collection(this.collectionName);
    return await productCategoryCollection.find().toArray();
  };


  async deleteProductCategory(id: string): Promise<void> {
    const productCategoryCollection = db.collection(this.collectionName);
    const result = await productCategoryCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      throw new Error(`Product with ID ${id} not found`);
    }
  };



}
