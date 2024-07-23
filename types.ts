import { UserRoleRepository } from "./source/domain/user-role/user-role-repository";
import { UserRepository } from "./source/domain/user/user-repository";

export const TYPES = {
    UserService: Symbol.for("UserService"),
    RoleService: Symbol.for("RoleService"),
    UserRoleService: Symbol.for("UserRoleService"),
    UserRoleRepository: Symbol.for("UserRoleRepository"),
    UserRepository: Symbol.for("UserRepository"),
    RoleRepository: Symbol.for("RoleRepository")

        


        


  };
  