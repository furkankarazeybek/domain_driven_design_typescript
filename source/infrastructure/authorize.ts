import { injectable } from "inversify";
import jwt from "jsonwebtoken";
import { IRole } from "../domain/role/role-model";
import actionStorage from "./action-storage";


const JWT_SECRET = process.env.JWT_SECRET || 'default';

@injectable()
class Authorize {

    
    async hasPermission(param: string, token: string): Promise<boolean> {
        
        try {

            const actionConfig = actionStorage[param];
            if (!actionConfig) {
                throw new Error(`Action for parameter "${param}" not found.`);
              }
            
            const requiredPermissionId = actionConfig.permissionId;
    
            if(requiredPermissionId === "") {
                return true;
            }
            
            const decodedToken = jwt.verify(token, JWT_SECRET) as { id: string; email: string, role: IRole };
            const roleInfo  = decodedToken.role;
            const permissionIds: string[] = roleInfo.permissionIds;

            const hasPermission = permissionIds.includes(requiredPermissionId);
            
            return hasPermission;

        } catch (error) {
            console.error("Error finding permissions:", error);
            throw new Error("Failed to find permissions");
        }
    }
}

export default Authorize;