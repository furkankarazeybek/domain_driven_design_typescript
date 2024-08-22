import express from 'express';
import { ProductService } from '../../domain/product/product-service';
import { ProductCategoryService } from '../../domain/product-category/product-category-service';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../types';



// const productRouter = express.Router();
// const productService = new ProductService();


// const productCategoryRouter = express.Router();
// const productCategoryService = new ProductCategoryService();


@injectable()
class ProductServiceHandler {

    private productService : ProductService;
    private productCategoryService : ProductCategoryService;
  
   
     constructor(
       @inject(TYPES.ProductService) productService: ProductService,
       @inject(TYPES.ProductCategoryService) productCategoryService: ProductCategoryService,
       
     ) {
       
       this.productService = productService;
       this.productCategoryService = productCategoryService;
     }

    async getProductList() {
        try {
          const products = await this.productService.getAllProducts();
          const categories = await this.productCategoryService.getAllProductCategories();
      
          const categoryMap = new Map<string, { _id: string; categoryName: string }>();
          categories.forEach((category:any) => {
            categoryMap.set(category._id.toString(), { _id: category._id.toString(), categoryName: category.categoryName });
          });
      
          const productsWithCategory = products.map(product => {
            const categoryIdStr = product.productCategoryId.toString(); // productCategoryId'yi string'e çeviriyoruz
            return {
              ...product,
              productCategory: categoryMap.get(categoryIdStr) || null,
            };
          });
      
          return productsWithCategory;
        } catch (error) {
          throw error;
        }
    }
      

    async getProductCategoriesList() {
        try {
            const productCategories = await this.productCategoryService.getAllProductCategories();
            return productCategories;
        } catch (error) {
            throw error;
        }
    }



    async addProduct (request: any) {
        try {
          console.log("add user role run");
          console.log("Request Body:", request);
    
    
          await this.productService.createProduct(
            request.productName,
            request.productCategoryId
          );
   
        }
   
       catch (error) {
         console.error("error is", error);
         throw new Error('Failed to login');
       }
       
      }

    async addProductCategory(request: any) {
     try {
       console.log("add user role run");
       console.log("Request Body:", request);
 
 
       await this.productCategoryService.createProductCategory(
         request.categoryName,
       );

     }

    catch (error) {
      console.error("error is", error);
      throw new Error('Failed to login');
    }
    
   }

   
  

}




export { ProductServiceHandler};
 