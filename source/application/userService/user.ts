import express from 'express';
import { UserService } from '../../domain/user/userService';
import { ProductService } from '../../domain/product/productService';
import { convertToUserDTO } from '../dto';

const userRouter = express.Router();
const userService= new UserService();

const productService = new  ProductService();

userRouter.get('/getAllUsers', async (req, res) => {
  try {
      const users = await userService.getAllUsers();
      const usersWithProducts = await convertToUserDTO(users, productService); 
      res.json(usersWithProducts);
      
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
