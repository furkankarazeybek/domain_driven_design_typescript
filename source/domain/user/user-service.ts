import { UserRepository } from './user-repository';
import { UserFactory } from './user-factory';
import { IUser } from './user-model';
import { inject, injectable } from "inversify";
import { TYPES } from '../../../types';

@injectable()
export class UserService {
  private userFactory: UserFactory;
  private userRepository: UserRepository;

  constructor(
    @inject(TYPES.UserFactory) userFactory: UserFactory,
    @inject(TYPES.UserRepository) userRepository: UserRepository
  ) {
    this.userFactory = userFactory;
    this.userRepository = userRepository;
  }


  async createUser(name: string, surname: string, email:string, password:string, roleId: string): Promise<IUser> {
      const user = this.userFactory.createUser(name,surname, email, password, roleId);
      await this.userRepository.createUser(user);

      return user;
  }
  

  async getAllUsers(): Promise<IUser[]> {
    return this.userRepository.findAllUsers();
  }

  async getUserById(id: string): Promise<IUser | null> {
    return this.userRepository.findUserById(id);
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await this.userRepository.findUserByEmail(email);
      return user;
    } catch (error) {
      console.error("An error occurred while finding the user by email:", error);
      throw new Error("Could not find user");
    }
  }




}
