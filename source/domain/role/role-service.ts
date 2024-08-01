import { TYPES } from '../../../types';
import { RoleFactory } from './role-factory';
import { IRole } from './role-model';
import { RoleRepository } from './role-repository';
import { inject, injectable } from "inversify";

@injectable()
export class RoleService {
  private roleRepository: RoleRepository;
  private roleFactory: RoleFactory;

  constructor(
    @inject(TYPES.RoleRepository) roleRepository: RoleRepository,
    @inject(TYPES.RoleFactory) roleFactory: RoleFactory
  ) 
  {
    this.roleFactory = roleFactory;
    this.roleRepository = roleRepository;
  }

  async createUserRole(roleName: string, permissionIds: string[]): Promise<IRole> {
    const role = this.roleFactory.createRole( roleName, permissionIds);
    return role;
  }

  async getRoleById(id: string): Promise<IRole | null> {
    return this.roleRepository.findById(id);
  }

  async getAllRoles(): Promise<IRole[]> {
    return this.roleRepository.findAll();
  }

}
