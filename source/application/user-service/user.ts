import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";
import { RoleService } from "../../domain/role/role-service";
import { UserRoleService } from "../../domain/user-role/user-role-service";
import { UserService } from "../../domain/user/user-service";
import { UserDto } from "./userDto";
import "reflect-metadata";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';




// const userService = container.get<UserService>(TYPES.UserService);
// const roleService = container.get<RoleService>(TYPES.RoleService);
// const userRoleService = container.get<UserRoleService>(TYPES.UserRoleService);


export const JWT_SECRET = process.env.JWT_SECRET || 'default'; 
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'; 


@injectable()
class UserServiceHandler {
 private userService : UserService;
 private roleService : RoleService;
 private userRoleService : UserRoleService;

  constructor(
    @inject(TYPES.UserService) userService: UserService,
    @inject(TYPES.RoleService) roleService: RoleService,
    @inject(TYPES.UserRoleService) userRoleService: UserRoleService,
    
  ) {
    
    this.userService = userService;
    this.roleService = roleService;
    this.userRoleService = userRoleService;
  }

  async getUserList() {
    try {
      console.log("USER LİSTESİ");

      const users = await this.userService.getAllUsers();
      const roles = await this.roleService.getAllRoles();
      const userListWithRoles = UserDto.getRoleIdsFromEntities(users, roles);
      return userListWithRoles;
    } catch (error) {
      console.error("An error occurred:", error); 
      throw error;
    }
  }

  async getUserById(request: any) {

    const { userId } = request;
    const user = await this.userService.getUserById(userId); 
  
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return { user };
  }

  async deleteUser(request: any) {
    const { userId } = request;
    const user = await this.userService.deleteUser(userId); 

  }


  async updateUser(request: any) {
    const { userId, ...updatedUser } = request;
    await this.userService.updateUser(userId, updatedUser);
    return { message: 'User updated successfully' };
  }
  

  async getRoleList() {
    try {
      const roles = await this.roleService.getAllRoles();
      return roles;
    } catch (error) {
      throw error;
    }
  }


  async addUser(request: any) {
    try {
      console.log("add user run");
      console.log("Request Body:", request);

      const hashedPassword = await bcrypt.hash(request.password, 10); 

      const user = await this.userService.createUser(
        request.name,
        request.surname,
        request.email,
        hashedPassword,
        request.roleId
      );

      const userJson = JSON.stringify(user);
      const userObj = JSON.parse(userJson);
      const userId = userObj._id;

      await this.userRoleService.createUserRole(userId, request.roleId);


      return { user };
    } catch (error) {
      console.error("error is", error);
      throw new Error('Failed to add user');
    }
  }


  async loginUser(request: any) {
    try {
      console.log("login user run");
      console.log("Request Body:", request);

      const { email, password } = request;

      
      const user = await this.userService.findUserByEmail(email); 
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isMatch = await bcrypt.compare(password, user.password); 
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      const roleObj = await this.roleService.getRoleById(user.roleId);

      const token = jwt.sign({ id: user._id, email: user.email, role: roleObj}, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

      return { user, token };
    } catch (error) {
      console.error("error is", error);
      throw new Error('Failed to login');
    }
  }


  async addUserRole(request: any) {
    try {
      console.log("add user role run");
      console.log("Request Body:", request);


      await this.roleService.createRole(
        request.roleName,
        request.permissionIds,
      );

    }

    catch (error) {
      console.error("error is", error);
      throw new Error('Failed to login');
    }

}

  // async addUser(request: any){ // infestracture altında interface oluştur any yerine
  //   try {
  //   console.log("add user run");
  //   console.log("Request Body:", request.body); 
  //   console.log("Reqquest:", request);


  //   const user = await this.userService.createUser( request.name, request.surname, request.email, request.password, request.roleId);
  //   const userJson = JSON.stringify(user);
  //   const userObj = JSON.parse(userJson);
  //   const userId = userObj._id;
  //   await this.userRoleService.createUserRole(userId, request.roleId);
  
   
  // } catch (error) {
  //   console.error("error is ", error);

  //   // throw  new error gelcek

 
  //  }
  // }



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


}


export { UserServiceHandler};
  function express() {
    throw new Error("Function not implemented.");
  }