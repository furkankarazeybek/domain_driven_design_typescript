import { injectable } from 'inversify';
import { Role, IRole } from './role-model';


@injectable()
export class RoleRepository {
  async findById(id: string): Promise<IRole | null> {
    return Role.findById(id).exec();
  }

  async createRole(role: IRole): Promise<IRole> {
    return role.save();
  }

  async findAll(): Promise<IRole[]> { 
    return Role.find().exec();
  }

}
