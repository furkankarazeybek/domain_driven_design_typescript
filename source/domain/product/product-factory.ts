import { injectable } from 'inversify';
import { IProduct } from './product-model';
import { ObjectId } from 'mongodb';

@injectable()
export class ProductFactory {

  createProduct(productName: string, productCategoryId: string): IProduct {
    return {
      _id: new ObjectId(), 
      productName: productName,
      productCategoryId: productCategoryId
    } as IProduct;
  }
}
