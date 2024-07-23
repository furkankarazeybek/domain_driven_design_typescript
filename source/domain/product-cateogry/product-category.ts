import { MongoClient, ObjectId } from "mongodb";
import { ProductCategoryRepository } from "./product-category-repository";


export interface IProductCategory {
    productCategoryName: string;
}
export class ProductCategoryService {
  private productCategoryRepository: ProductCategoryRepository;
  constructor() {
    this.productCategoryRepository = new ProductCategoryRepository();
  }

  async getAllProductCategories() {
    return this.productCategoryRepository.findAll();
  }
  

  
  async addProductCategory(productCategoryName: IProductCategory) {
    try {
     this.productCategoryRepository.create(productCategoryName);
    } catch (error) {
        throw new Error('Error while adding product');
    }
   }


   async getCategoriesById (categoryIds: string[]){

    const collection = await this.productCategoryRepository.findCategoriesByIds(categoryIds);
    const objectIds = categoryIds.map(id => new ObjectId(id));
    return await collection.find({ _id: { $in: objectIds } }).toArray();

   }

   

   
}
