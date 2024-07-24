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

  createRole(roleId: number, roleName: string): IRole {
    return  new this.roleModel({ roleId, roleName })
  }
}
