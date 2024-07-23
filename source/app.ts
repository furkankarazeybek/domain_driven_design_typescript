import express from 'express';
import { productRouter } from './application/product-service/product';
import { productCategoryRouter } from './application/product-service/product';
import { userRouter } from './application/user-service/user';
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
