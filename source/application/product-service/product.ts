import express from 'express';
import { ProductService } from '../../domain/product/product-service';
import { ProductCategoryService } from '../../domain/product-cateogry/product-category';
import { injectable } from 'inversify';



const productRouter = express.Router();
const productService = new ProductService();


const productCategoryRouter = express.Router();
const productCategoryService = new ProductCategoryService();


@injectable()
class ProductServiceHandler {

    async getProductList() {
        try {
          const products = await productService.getAllProducts();
          return products;
        } catch (error) {
          throw error;
        }
      }

}



productRouter.get('/getAllproducts', async (req, res) => {
    try {
      
    } catch (error) {
        console.error("Error while fetching products:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

productRouter.post('/addProduct', async (req, res) => {
    const { productName, productCategoryId } = req.body;

    if (!productName) {
        return res.status(400).json({ error: 'Product name is required' });
    }

    try {
        const newProduct = await productService.addProduct({ productName, productCategoryId });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error while adding product:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


productRouter.get('/productsByIds', async (req, res) => {
    const { ids } = req.query;
    if (!ids) {
      return res.status(400).json({ error: 'Product IDs are required' });
    }
  
    const productIds = (ids as string).split(',');
  
    try {
      const products = await productService.getProductsById(productIds);
      res.json(products);
    } catch (error) {
      console.error("Error while fetching products:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

productCategoryRouter.get('/getAllProductCategories', async (req, res) => {
    try {
        const productCategories = await productCategoryService.getAllProductCategories();
        res.json(productCategories);
    } catch (error) {
        console.error("Error while fetching product categories:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

productCategoryRouter.post('/addProductCategory', async (req, res) => {
    const { productCategoryName } = req.body;

    if (!productCategoryName) {
        return res.status(400).json({ error: 'Product name is required' });
    }

    try {
        const newProductCategory = await productCategoryService.addProductCategory({ productCategoryName });
        res.status(201).json(newProductCategory);
    } catch (error) {
        console.error("Error while adding product:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});







export { productRouter, productCategoryRouter,  ProductServiceHandler };
