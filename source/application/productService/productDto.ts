
export class productDto {


     productIdsDto(products: any ){
        const productList: string[] = products.map((product: any) => ({
           productId: product._id.toHexString(),
           productName:  product.productName
        }));
    
        return productList;
    }
    
    }
    
    
    
    
    
    
    
    
    