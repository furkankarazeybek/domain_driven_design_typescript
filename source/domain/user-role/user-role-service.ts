import { UserRoleRepository } from './user-role-repository';
import { UserRoleFactory } from './user-role-factory';
import { IUserRole } from './user-role-model';
import { injectable, inject } from "inversify";
import { TYPES } from '../../../types';
 
@injectable() 
export class UserRoleService {
  private userRoleRepository: UserRoleRepository;
  private userRoleFactory: UserRoleFactory;

  constructor(
    @inject(TYPES.UserRoleRepository) userRoleRepository: UserRoleRepository,
    @inject(TYPES.UserRoleFactory) userRoleFactory: UserRoleFactory,

  )
  {
    this.userRoleRepository = userRoleRepository;
    this.userRoleFactory = userRoleFactory;
  }

  async createUserRole(userId: string, roleId: string): Promise<IUserRole> {
    const userRole = this.userRoleFactory.createUserRole(userId, roleId);
    await this.userRoleRepository.createUserRole(userRole);

    return userRole;
  }

  async getUserRoleById(id: string): Promise<IUserRole | null> {
    return this.userRoleRepository.findById(id);
  }
}
