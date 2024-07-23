import "reflect-metadata";
import { Container } from "inversify";

import { TYPES } from "./types";
import { UserService } from "./source/domain/user/user-service";
import { RoleService } from "./source/domain/role/role-service";
import { UserRoleService } from "./source/domain/user-role/user-role-service";
import { UserRoleRepository } from "./source/domain/user-role/user-role-repository";
import { UserRepository } from "./source/domain/user/user-repository";
import { RoleRepository } from "./source/domain/role/role-repository";

const container = new Container();

container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<RoleService>(TYPES.RoleService).to(RoleService);
container.bind<UserRoleService>(TYPES.UserRoleService).to(UserRoleService);
container.bind<UserRoleRepository>(TYPES.UserRoleRepository).to(UserRoleRepository);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<RoleRepository>(TYPES.RoleRepository).to(RoleRepository);


export { container };
