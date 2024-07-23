import { injectable } from 'inversify';
import { IUser, User } from './user-model';

export class UserFactory {
  static createUser(userName: string, roleId: string): IUser {
    return new User({ userName, roleId });
  }
}
