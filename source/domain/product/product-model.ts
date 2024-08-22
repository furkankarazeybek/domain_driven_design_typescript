import { ObjectId } from 'mongodb';

export interface IProduct {
  _id: ObjectId;
  productName: string;
  productCategoryId: string;
}

