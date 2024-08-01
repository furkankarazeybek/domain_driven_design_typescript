import { ObjectId } from 'mongodb';

interface IRole {
  _id: ObjectId;
  roleName: string;
  permissionIds: string[];
}

export { IRole };