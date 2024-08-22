import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { UserService } from "./source/domain/user/user-service";
import { RoleService } from "./source/domain/role/role-service";
import { UserRoleService } from "./source/domain/user-role/user-role-service";
import { UserRoleRepository } from "./source/domain/user-role/user-role-repository";
import { UserRepository } from "./source/domain/user/user-repository";
import { RoleRepository } from "./source/domain/role/role-repository";
import { UserFactory } from "./source/domain/user/user-factory";
import { UserRoleFactory } from "./source/domain/user-role/user-role-factory";
import { RoleFactory } from "./source/domain/role/role-factory";
import { UserServiceHandler } from "./source/application/user-service/user";
import { ProductServiceHandler } from "./source/application/product-service/product";
import { ApplicationStorage } from "./source/infrastructure/application-storage";
import { ProductService } from "./source/domain/product/product-service";
import Authorize from "./source/infrastructure/authorize";
import { ProductRepository } from "./source/domain/product/product-repository";
import { ProductFactory } from "./source/domain/product/product-factory";
import { ProductCategoryService } from "./source/domain/product-category/product-category-service";
import { ProductCategoryRepository } from "./source/domain/product-category/product-category-repository";
import { ProductCategoryFactory } from "./source/domain/product-category/product-category-factory";


const container = new Container();


// Services
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<RoleService>(TYPES.RoleService).to(RoleService);
container.bind<UserRoleService>(TYPES.UserRoleService).to(UserRoleService);
container.bind<ProductService>(TYPES.ProductService).to(ProductService);
container.bind<ProductCategoryService>(TYPES.ProductCategoryService).to(ProductCategoryService);


// Repositories
container.bind<UserRoleRepository>(TYPES.UserRoleRepository).to(UserRoleRepository);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<RoleRepository>(TYPES.RoleRepository).to(RoleRepository);
container.bind<ProductRepository>(TYPES.ProductRepository).to(ProductRepository);
container.bind<ProductCategoryRepository>(TYPES.ProductCategoryRepository).to(ProductCategoryRepository);



// Factories
container.bind<UserFactory>(TYPES.UserFactory).to(UserFactory);
container.bind<UserRoleFactory>(TYPES.UserRoleFactory).to(UserRoleFactory);
container.bind<RoleFactory>(TYPES.RoleFactory).to(RoleFactory);
container.bind<ProductFactory>(TYPES.ProductFactory).to(ProductFactory);
container.bind<ProductCategoryFactory>(TYPES.ProductCategoryFactory).to(ProductCategoryFactory);



// Handlers
container.bind<UserServiceHandler>(TYPES.UserServiceHandler).to(UserServiceHandler);
container.bind<ProductServiceHandler>(TYPES.ProductServiceHandler).to(ProductServiceHandler);


container.bind<ApplicationStorage>(TYPES.ApplicationStorage).to(ApplicationStorage);

container.bind<Authorize>(TYPES.Authorize).to(Authorize);


export default container;
