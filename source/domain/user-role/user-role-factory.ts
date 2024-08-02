import { injectable, inject } from 'inversify';
import { IUserRole } from './user-role-model';
import { ObjectId } from 'mongodb';

@injectable()
export class UserRoleFactory {

  createUserRole(userId: string, roleId: string) :  IUserRole {

     return {
       _id: new ObjectId(), 
       userId: userId,
       roleId: roleId,
    
     } as IUserRole;
   }

 }
