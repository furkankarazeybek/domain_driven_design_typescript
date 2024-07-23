import { injectable } from 'inversify';
import { User, IUser } from './user-model';

@injectable()
export class UserRepository {

  async findAll(): Promise<IUser[]> { 
    return User.find().exec();
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id).exec();
  }

  async createUser(user: IUser): Promise<IUser> {
    return user.save();
  }

}
