import { injectable, inject } from 'inversify';
import { IRole } from './role-model';
import { ObjectId } from 'mongodb';

@injectable()
export class RoleFactory {

   createRole(roleName: string, permissionIds: string[]) : IRole {

      return {
        _id: new ObjectId(), 
        roleName: roleName,
        permissionIds: permissionIds,
     
      } as IRole;
    }

  }



