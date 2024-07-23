import { UserRoleRepository } from './user-role-repository';
import { UserRoleFactory } from './user-role-factory';
import { IUserRole } from './user-role-model';
import { injectable, inject } from "inversify";
import { TYPES } from '../../../types';
 
@injectable() 
export class UserRoleService {
  private userRoleRepository: UserRoleRepository;

  constructor(@inject(TYPES.UserRoleRepository) userRoleRepository: UserRoleRepository)
  {
    this.userRoleRepository = userRoleRepository;
  }

  async createUserRole(userId: string, roleId: string): Promise<IUserRole> {
    const userRole = UserRoleFactory.createUserRole(userId, roleId);
    return this.userRoleRepository.createUserRole(userRole);
  }

  async getUserRoleById(id: string): Promise<IUserRole | null> {
    return this.userRoleRepository.findById(id);
  }
}
