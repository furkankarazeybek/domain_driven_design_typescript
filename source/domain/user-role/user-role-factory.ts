import { injectable, inject } from 'inversify';
import { Model } from 'mongoose';
import { IUserRole } from './user-role-model';
import { TYPES } from '../../../types';

@injectable()
export class UserRoleFactory {
  private userRoleModel: Model<IUserRole>;

  constructor(@inject(TYPES.UserRoleModel) userRoleModel: Model<IUserRole>) {
    this.userRoleModel = userRoleModel;
  }

 createUser(userId: string, roleId: string): IUserRole{
  
    return new this.userRoleModel({ userId, roleId });
  }
}
