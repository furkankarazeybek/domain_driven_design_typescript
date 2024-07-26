import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { UserServiceHandler } from "../application/user-service/user";
import { ProductServiceHandler } from "../application/product-service/product";

@injectable()
export class ApplicationStorage {

    private userServiceHandler : UserServiceHandler;
    private productServiceHandler : ProductServiceHandler;

    
    private applications: { [key: string]: Function };
 

    constructor(
        @inject(TYPES.UserServiceHandler) userServiceHandler: UserServiceHandler,
        @inject(TYPES.ProductServiceHandler) productServiceHandler: ProductServiceHandler,
        
    ) { 

        this.userServiceHandler = userServiceHandler;
        this.productServiceHandler = productServiceHandler;
        this.applications = {
        UserList: this.userServiceHandler.getUserList.bind(this.userServiceHandler),
        RoleList: this.userServiceHandler.getRoleList.bind(this.userServiceHandler),
     
        
        };
       
    }

    

    public async executeApplicationMethod(methodName: string, ...args: any[]) {
        if (this.applications.hasOwnProperty(methodName)) {

            const method = this.applications[methodName];
            return await method(...args);
        } else {
            throw new Error(`Method ${methodName} not found.`);
        }
    }

   
}

