import { injectable } from 'inversify';
import { UserRole, IUserRole } from './user-role-model';


@injectable()
export class UserRoleRepository {
  async findById(id: string): Promise<IUserRole | null> {
    return UserRole.findById(id).exec();
  }

  async createUserRole(userRole: IUserRole): Promise<IUserRole> {
    return userRole.save();
  }

}
