import { TYPES } from '../../../types';
import { RoleFactory } from './role-factory';
import { IRole } from './role-model';
import { RoleRepository } from './role-repository';
import { inject, injectable } from "inversify";

@injectable()
export class RoleService {
  private roleRepository: RoleRepository;

  constructor(@inject(TYPES.RoleRepository) roleRepository: RoleRepository) 
  {
    this.roleRepository = new RoleRepository();
  }

  async createRole(roleId: number, roleName: string): Promise<IRole> {
    const role = RoleFactory.createRole(roleId, roleName);
    return this.roleRepository.createRole(role);
  }

  async getRoleById(id: string): Promise<IRole | null> {
    return this.roleRepository.findById(id);
  }

  async getAllRoles(): Promise<IRole[]> {
    return this.roleRepository.findAll();
  }

}
