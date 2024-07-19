import express from 'express';
import { UserService } from '../../domain/user/userService';
import { ProductService } from '../../domain/product/productService';
import { convertToUserDTO } from '../dto';
import { userDto } from './userDto';
import { productDto } from '../productService/productDto';

const userRouter = express.Router();
const userService= new UserService();

const productService = new  ProductService();

userRouter.get('/getAllUsers', async (req, res) => {
  try {
      const users = await userService.getAllUsers();
      const products = await productService.getAllProducts();

      const dtoUser = new userDto();
      const usersProductIds =  dtoUser.userProductIdsDto(users);
      console.log(usersProductIds);
      
      const dtoProduct = new productDto();
      const productsArray: any= dtoProduct.productIdsDto(products);
      console.log(productsArray);

  

   
  
    

      let usersListWithProducts: { _id: string, userName: string, products: { productId: string, productName: string }[] }[] = [];

      for (const user of users) {
        const userProducts: any[] = [];

        for (let i = 0; i < usersProductIds.length; i++) {
          const productId = usersProductIds[i];
        
          const product = productsArray.find((p:any) => p._id === productId);

          console.log(product);
        
          if (product) {
            userProducts.push(product);
          }
        }
        



        
        usersListWithProducts.push({
          _id: user._id.toHexString(),
          userName: user.userName,
          products: userProducts
        });
      }
      
      console.log(usersListWithProducts);
  
      res.json(usersListWithProducts);    
  } 
  catch (error) {
      console.error("Error while fetching users:", error);
      res.status(500).json({ error: 'Internal server error' });
  }
});




  userRouter.post('/addUser', async (req, res) => {
    const { userName, productIds } = req.body;

    if (!userName || !productIds || !Array.isArray(productIds)) {
      return res.status(400).json({ error: 'Invalid input data' });
     }

    try {
        const newUser = await userService.addUser({ userName, productIds });
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error while adding user:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export { userRouter };
