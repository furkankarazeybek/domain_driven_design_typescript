import { ObjectId } from 'mongodb';

export interface IUser {
  _id: ObjectId;
  name: string;
  surname: string;
  email: string;
  password: string;
  roleId: string;
  productIds?: string[];
  isDeleted: boolean
}

