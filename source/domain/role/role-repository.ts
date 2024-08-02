import { injectable } from 'inversify';
import {  IRole } from './role-model';
import { db } from '../../utils/db';
import { ObjectId } from 'mongodb';


@injectable()
export class RoleRepository {


  private collectionName = "roles";
  async createRole(role: IRole): Promise<void>  {
    const roleCollection = db.collection('roles');
    await roleCollection.insertOne(role);
  }

  async findById(id: string): Promise<IRole | null> {
    const roleCollection = db.collection(this.collectionName);
    const objectId = new ObjectId(id);
    return await roleCollection.findOne({ _id:  objectId });
  }


  async findAll(): Promise<IRole[]> { 
    const roleCollection = db.collection(this.collectionName);
    return await roleCollection.find().toArray();
  }

}
