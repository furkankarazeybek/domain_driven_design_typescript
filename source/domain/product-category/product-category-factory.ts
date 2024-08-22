import { injectable } from 'inversify';
import { IProductCategories } from './product-category-model';
import { ObjectId } from 'mongodb';

@injectable()
export class ProductCategoryFactory {

  createProductCategory(categoryName: string,): IProductCategories {
    return {
      _id: new ObjectId(), 
      categoryName: categoryName,
    } as IProductCategories;
  }
}
