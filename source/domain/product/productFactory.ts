import { ObjectId } from "mongodb";

export class ProductFactory {

    generateProduct(productIds: string[]) {

        return productIds.map(id => new ObjectId(id));
    }

  
}