import {IRole, Role } from './role-model';

export class RoleFactory {
  static createRole(roleId:number, roleName: string): IRole {
    return new Role({ roleId, roleName });
  }
}
