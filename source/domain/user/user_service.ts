import axios from 'axios';
import { ProductRepository } from '../product/product_repository';
import { UserRepository } from './user_repository';


export interface IUser {
  userName: string;
  productIds: string[]; 
}
export class UserService {
  private userRepository: UserRepository;
  private productApiUrl: string;



  constructor() {
    this.userRepository = new UserRepository();
    this.productApiUrl = process.env.PRODUCT_API_URL || '';

  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async addUser(user: IUser) {
    try {
     this.userRepository.create(user);
    } catch (error) {
        throw new Error('Error while adding product');
    }
   }

  



   
}
