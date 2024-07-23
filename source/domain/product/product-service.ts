import { ObjectId } from 'mongodb';
import { ProductRepository } from './product-repository';
import { ProductFactory } from './product-factory';


export interface IProduct {
    productName: string;
    productCategoryId : string;
    
}
export class ProductService {
  getAllProductCategories() {
      throw new Error('Method not implemented.');
  }
  private productRepository: ProductRepository;
  private productFactory: ProductFactory;

  constructor() {
    this.productRepository = new ProductRepository();
    this.productFactory = new ProductFactory();
  
    
  }

  async getAllProducts() {
    return this.productRepository.findAll();
  }

  
  async addProduct(product: IProduct) {
    try {
     this.productRepository.create(product);
    } catch (error) {
        throw new Error('Error while adding product');
    }
   }

   async getProductsById (productIds: string[]){

    const collection = await this.productRepository.findProductsByIds(productIds);
    const objectIds = this.productFactory.generateProduct(productIds);
    return collection.find({ _id: { $in: objectIds } }).toArray();  // mongodb kalkacak
    

   }


}


