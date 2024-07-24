import { injectable, inject } from 'inversify';
import { Model } from 'mongoose';
import { IUser } from './user-model';
import { TYPES } from '../../../types';

@injectable()
export class UserFactory {
  private userModel: Model<IUser>;

  constructor(@inject(TYPES.UserModel) userModel: Model<IUser>) {
    this.userModel = userModel;
  }

  createUser(userName: string, roleId: string): IUser {
    return new this.userModel({ userName, roleId });
  }
}
