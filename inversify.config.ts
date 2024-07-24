import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { UserService } from "./source/domain/user/user-service";
import { RoleService } from "./source/domain/role/role-service";
import { UserRoleService } from "./source/domain/user-role/user-role-service";
import { UserRoleRepository } from "./source/domain/user-role/user-role-repository";
import { UserRepository } from "./source/domain/user/user-repository";
import { RoleRepository } from "./source/domain/role/role-repository";
import { IUser, User } from "./source/domain/user/user-model";
import { UserFactory } from "./source/domain/user/user-factory";
import { Model } from "mongoose";
import { IUserRole, UserRole } from "./source/domain/user-role/user-role-model";
import { UserRoleFactory } from "./source/domain/user-role/user-role-factory";
import { IRole, Role } from "./source/domain/role/role-model";
import { RoleFactory } from "./source/domain/role/role-factory";

const container = new Container();

// Services
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<RoleService>(TYPES.RoleService).to(RoleService);
container.bind<UserRoleService>(TYPES.UserRoleService).to(UserRoleService);

// Repositories
container.bind<UserRoleRepository>(TYPES.UserRoleRepository).to(UserRoleRepository);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<RoleRepository>(TYPES.RoleRepository).to(RoleRepository);

// Models
container.bind<Model<IUser>>(TYPES.UserModel).toConstantValue(User);
container.bind<Model<IUserRole>>(TYPES.UserRoleModel).toConstantValue(UserRole);
container.bind<Model<IRole>>(TYPES.RoleModel).toConstantValue(Role);

// Factories
container.bind<UserFactory>(TYPES.UserFactory).to(UserFactory);
container.bind<UserRoleFactory>(TYPES.UserRoleFactory).to(UserRoleFactory);
container.bind<RoleFactory>(TYPES.RoleFactory).to(RoleFactory);

export { container };
