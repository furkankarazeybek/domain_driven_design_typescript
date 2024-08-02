import { ObjectId } from 'mongodb';

export interface IUserRole {
  _id: ObjectId;
  userId: string;
  roleId: string;
  
}

