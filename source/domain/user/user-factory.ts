import { injectable } from 'inversify';
import { IUser } from './user-model';
import { ObjectId } from 'mongodb';

@injectable()
export class UserFactory {

  // createUser method returns an IUser type
  createUser(name: string, surname: string, email: string, password: string, roleId: string): IUser {
    return {
      _id: new ObjectId(), 
      name: name,
      surname: surname,
      email: email,
      password: password,
      roleId: roleId,
      productIds: [],
      isDeleted : false
    } as IUser;
  }
}
