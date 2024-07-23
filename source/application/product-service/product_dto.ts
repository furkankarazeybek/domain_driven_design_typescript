
export class productDto {


     productCategoriesIds(products: any ){

      const productCategoriesList: string[] = products.flatMap((products : any) => products.productCategoriesId);
  
      return productCategoriesList;
  }
    
    }
    
    
    
    
    
    
    
    
    