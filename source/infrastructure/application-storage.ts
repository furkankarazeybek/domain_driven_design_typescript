import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { UserServiceHandler } from "../application/user-service/user";
import { ProductServiceHandler } from "../application/product-service/product";

@injectable()
export class ApplicationStorage {
  private userServiceHandler: UserServiceHandler;
  private productServiceHandler: ProductServiceHandler;
  private applications: { [key: string]: any };

  

  constructor(
    @inject(TYPES.UserServiceHandler) userServiceHandler: UserServiceHandler,
    @inject(TYPES.ProductServiceHandler) productServiceHandler: ProductServiceHandler
  ) {
    this.userServiceHandler = userServiceHandler;
    this.productServiceHandler = productServiceHandler;
    this.applications = {
      UserServiceHandler: this.userServiceHandler,
      ProductServiceHandler: this.productServiceHandler,
    };
  }

  getApplication(applicationName: string): any {
    return this.applications[applicationName];
  }
}
