import { TYPES } from '../../../types';
import { ProductCategoryFactory } from './product-category-factory';
import { IProductCategories } from './product-category-model';
import { ProductCategoryRepository } from './product-category-repository';
import { inject, injectable } from "inversify";

@injectable()
export class ProductCategoryService {
  private productCategoryRepository: ProductCategoryRepository;
  private productCategoryFactory: ProductCategoryFactory;

  constructor(
    @inject(TYPES.ProductCategoryRepository) productCategoryRepository: ProductCategoryRepository,
    @inject(TYPES.ProductCategoryFactory) productCategoryFactory: ProductCategoryFactory
  ) 
  {
    this.productCategoryFactory = productCategoryFactory;
    this.productCategoryRepository = productCategoryRepository;
  }

  async createProductCategory(categoryName: string): Promise<IProductCategories> {
    const productCategory = this.productCategoryFactory.createProductCategory(categoryName);
    await this.productCategoryRepository.createProduct(productCategory);

    return productCategory;
  }


  async getAllProductCategories(): Promise<IProductCategories[]> {
    return this.productCategoryRepository.findAllProductCategories();
  }

}
