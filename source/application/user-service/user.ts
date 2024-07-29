import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";
import { RoleService } from "../../domain/role/role-service";
import { UserRoleService } from "../../domain/user-role/user-role-service";
import { UserService } from "../../domain/user/user-service";
import { UserDto } from "./userDto";
import "reflect-metadata";


// const userService = container.get<UserService>(TYPES.UserService);
// const roleService = container.get<RoleService>(TYPES.RoleService);
// const userRoleService = container.get<UserRoleService>(TYPES.UserRoleService);


@injectable()
class UserServiceHandler {
 private userService : UserService;
 private roleService : RoleService;

  constructor(
    @inject(TYPES.UserService) userService: UserService,
    @inject(TYPES.RoleService) roleService: RoleService,

    
  ) {
    
    this.userService = userService;
    this.roleService = roleService;
  }

  async getUserList() {
    try {
      console.log("USER LİSTESİ");
      console.log("2", this.userService.getAllUsers());
      const users = await this.userService.getAllUsers();
      console.log("Users retrieved:", users);
  
      const roles = await this.roleService.getAllRoles();
      console.log("Roles retrieved:", roles);
  
      const userListWithRoles = UserDto.getRoleIdsFromEntities(users, roles);
      console.log("USER LİSTESİ", userListWithRoles);
  
      return userListWithRoles;
    } catch (error) {
      console.error("An error occurred:", error); // Hata mesajını yazdır
      throw error;
    }
  }
  

  async getRoleList() {
    try {
      const roles = await this.roleService.getAllRoles();
      return roles;
    } catch (error) {
      throw error;
    }
  }
}



// class UserServiceHandler {
//   private param?: string;

//   constructor();
//   constructor(param: string);
//   constructor(param?: string) {
//     if (param) {
//       this.param = param;
//     }
//   }

//   private actionMap: { [key: string]: () => Promise<any> } = {  //javadaki hashmap 
//     users: async () => {
//       const users = await userService.getAllUsers();
//       const roles = await roleService.getAllRoles();
//       const userListWithRoles = UserDto.getRoleIdsFromEntities(users, roles);
//       return userListWithRoles;
//     },
//     roles: async () => {
//       const roles = await roleService.getAllRoles();
//       return roles;
//     }
//   };

//   async getUserData(param: string) {
//     const action = this.actionMap[param];
//     if (action) {
//       try {
//         return await action();
//       } catch (error) {
//         throw error;
//       }
//     } else {
//       throw new Error(`Invalid param: ${param}`);
//     }
//   }
// }


// userRouter.post('/addUser', async (req, res) => {
//   try {
//     const { userName, roleId } = req.body;
//     const user = await userService.createUser(userName, roleId);
//     const userJson = JSON.stringify(user);
//     const userObj = JSON.parse(userJson);
//     const userId = userObj._id;
//     userRoleService.createUserRole(userId, roleId);

//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error', error });
//   }
// });





export { UserServiceHandler};
