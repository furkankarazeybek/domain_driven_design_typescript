import {  injectable } from 'inversify';
import { ObjectId } from 'mongodb';
import { IUser } from './user-model';
import { db } from '../../utils/db';

@injectable()
export class UserRepository {
 
  private collectionName = 'users';

  async createUser (user: IUser) : Promise<IUser> {
    const userCollection = db.collection('users');
    return await userCollection.insertOne(user);
  };
  
  async findUserById (id: string) : Promise<IUser | null>  {
    const userCollection = db.collection(this.collectionName);
    return await userCollection.findOne({ _id:  new ObjectId(id) });
  };
  
  async findUserByEmail (email: string) : Promise<IUser | null> {
    const userCollection = db.collection(this.collectionName);
    return await userCollection.findOne({ email });
  };
  
  async findAllUsers ()  : Promise<IUser[]>  {
    const userCollection = db.collection(this.collectionName);
    return await userCollection.find().toArray();
  };

}
