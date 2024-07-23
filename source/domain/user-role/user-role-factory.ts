import { IUserRole ,UserRole } from './user-role-model';

export class UserRoleFactory {
  static createUserRole(userId: string, roleId: string): IUserRole {
    return new UserRole({ userId, roleId });
  }
}
