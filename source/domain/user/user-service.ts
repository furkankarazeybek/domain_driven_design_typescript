import { UserRepository } from './user-repository';
import { UserFactory } from './user-factory';
import { IUser } from './user-model';
import { inject, injectable } from "inversify";
import { TYPES } from '../../../types';

@injectable()
export class UserService {
  private userRepository: UserRepository;

  constructor(@inject(TYPES.UserRepository) userRepository: UserRepository) 
  {
    this.userRepository = new UserRepository();
  }

  async createUser(userName: string, roleId: string): Promise<IUser> {

    const user = UserFactory.createUser(userName, roleId);
    return this.userRepository.createUser(user);

  }

  async getAllUsers(): Promise<IUser[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<IUser | null> {
    return this.userRepository.findById(id);
  }

}
