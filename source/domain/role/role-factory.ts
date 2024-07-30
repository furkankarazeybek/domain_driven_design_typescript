import { injectable, inject } from 'inversify';
import { Model, Document } from 'mongoose';
import { IRole } from './role-model';
import { TYPES } from '../../../types';

@injectable()
export class RoleFactory {
  private roleModel: Model<IRole>;

  constructor(@inject(TYPES.RoleModel) roleModel: Model<IRole>) {
    this.roleModel = roleModel;
  }

  createRole( roleName: string, permissionIds: string[]): IRole {
    return  new this.roleModel({  roleName, permissionIds })
  }
}
