import { TYPES } from '../../../types';
import { ProductFactory } from './product-factory';
import { IProduct } from './product-model';
import { ProductRepository } from './product-repository';
import { inject, injectable } from "inversify";

@injectable()
export class ProductService {
  private productRepository: ProductRepository;
  private productFactory: ProductFactory;

  constructor(
    @inject(TYPES.ProductRepository) productRepository: ProductRepository,
    @inject(TYPES.ProductFactory) productFactory: ProductFactory
  ) 
  {
    this.productFactory = productFactory;
    this.productRepository = productRepository;
  }

  async createProduct(productName: string, productCategoryId: string): Promise<IProduct> {
    const product = this.productFactory.createProduct(productName, productCategoryId);
    await this.productRepository.createProduct(product);

    return product;
  }


  async getAllProducts(): Promise<IProduct[]> {
    return this.productRepository.findAllProducts();
  }

}
