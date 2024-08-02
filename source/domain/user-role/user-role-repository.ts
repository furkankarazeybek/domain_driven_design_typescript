import { injectable } from 'inversify';
import {  IUserRole } from './user-role-model';
import { ObjectId } from 'mongodb';
import { db } from '../../utils/db';


@injectable()
export class UserRoleRepository {

  private collectionName = "userroles";
  async createUserRole(userRole: IUserRole): Promise<void>  {
    const roleCollection = db.collection('userroles');
    await roleCollection.insertOne(userRole);
  }

  async findById(id: string): Promise<IUserRole | null> {
    const useRoleCollection = db.collection(this.collectionName);
    const objectId = new ObjectId(id);
    return await useRoleCollection.findOne({ _id:  objectId });
  }



}
