import express from 'express';
import { productRouter } from './application/productService/product';
import { productCategoryRouter } from './application/productService/product';
import { userRouter } from './application/userService/user';
import connectDB from './utils/db';


connectDB();


const app = express();
const port = 3000;


app.use(express.json())
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/productCategory", productCategoryRouter);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
