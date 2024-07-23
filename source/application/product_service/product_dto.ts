
export class productDto {


     productCategoriesIds(products: any ){
      // Her kullanıcının productIds'lerini içeren bir liste oluştur
      const productCategoriesList: string[] = products.flatMap((products : any) => products.productCategoriesId);
  
      return productCategoriesList;
  }
    
    }
    
    
    
    
    
    
    
    
    