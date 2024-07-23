import express from 'express';
import { UserService } from '../../domain/user/user_service';
import { ProductService } from '../../domain/product/product_service';
import { userDto } from './user_dto';
import { productDto } from '../product_service/product_dto';

const userRouter = express.Router();
const userService= new UserService();

const productService = new  ProductService();

userRouter.get('/getAllUsers', async (req, res) => {
  try {
      const users = await userService.getAllUsers();
      const products = await productService.getAllProducts();
      console.log("users list", users);

      const dtoUser = new userDto();
      const usersProductIds =  dtoUser.userProductIdsDto(users);
      console.log(usersProductIds);


                      
      const productNumber = users.map(user => user.productIds.length);
      
      const usersListWithProducts: any[] = [];
           
         for (let userIndex = 0; userIndex < users.length; userIndex++) {
           const user = users[userIndex];
           const userProducts: any[] = [];
           const usersProductIds = user.productIds; 
           const numberOfProductsToAssign = productNumber[userIndex];
         
           for (let i = 0; i < numberOfProductsToAssign; i++) {
             const productId = usersProductIds[i];
             const product = products.find((p: any) => p._id.toHexString() === productId);
         
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
