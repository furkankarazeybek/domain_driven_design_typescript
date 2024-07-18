import { ProductService } from '../domain/product/productService';
import { ProductCategoryService } from '../domain/productCategory/productCategoryService';

export async function convertToUserDTO(users: any[], productService: ProductService) {

const userProductIdList: any = users.map(user => {
    return user.productIds;
});

let products = "";

// return convertToUserDTO.(userProductIdList, products); // bunu application katmanında yapılacak

    const usersWithProducts = await Promise.all(users.map(async (user: any) => {
        if (!Array.isArray(user.productIds)) {
            return {
                userId: user._id,
                userName: user.userName,
                products: []
            };
        }
        const products = await productService.getProductsById(user.productIds);
        const productsInfo = products.map(product => ({
            productId: product._id.toString(),
            productName: product.productName
        }));
        return {
            userId: user._id,
            userName: user.userName,
            products: productsInfo
        };
    }));

    return usersWithProducts;
}





export async function convertToProductDTO(products: any[], categoryService: any) {
    const productsWithCategories = await Promise.all(products.map(async (product) => {
        if (!Array.isArray(product.categoryIds)) {
            return {
                productId: product._id.toString(),
                productName: product.productName,
                categories: []
            };
        }
        const categories = await categoryService.getCategoriesById(product.categoryIds);
        const categoriesInfo = categories.map((category:any) => ({
            categoryId: category._id.toString(),
            categoryName: category.categoryName
        }));
        return {
            productId: product._id.toString(),
            productName: product.productName,
            categories: categoriesInfo
        };
    }));

    return productsWithCategories;
}
