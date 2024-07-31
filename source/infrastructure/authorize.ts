import { injectable } from "inversify";
import jwt from "jsonwebtoken";
import { User } from "../domain/user/user-model";
import { Role } from "../domain/role/role-model";

const JWT_SECRET = process.env.JWT_SECRET || 'default';

@injectable()
class Authorize {

    // action-storage.ts
    // findbyıd kalkcak
    // buraya sadece token gelcek
    // user login yaptığında roleId ve role
    
    async hasPermissionFromPermissionIds(permissionIdThroughToken: string[], token: string): Promise<boolean> {

        if (permissionIdThroughToken.length === 0) {
            return  true;
        }

        try {
            const decodedToken = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
            const { id } = decodedToken;

            const user = await User.findById(id).exec();
            if (!user) {
                throw new Error("User not found");
            }
            const { roleId } = user;
            console.log("User's roleId:", roleId);

            const role = await Role.findById(roleId).exec();
            if (!role) {
                throw new Error("Role not found");
            }
            const { permissionIds } = role;
            console.log("Role's permissionIds:", permissionIds);

            console.log("PermissionIds through token:", permissionIdThroughToken);

            const hasRequiredPermissions = permissionIdThroughToken.every(permissionId => 
                permissionIds.includes(permissionId) || permissionId === ""
            );

            // console.log(hasRequiredPermissions);

            return hasRequiredPermissions;

        } catch (error) {
            console.error("Error finding permissions:", error);
            throw new Error("Failed to find permissions");
        }
    }
}

export default Authorize;
