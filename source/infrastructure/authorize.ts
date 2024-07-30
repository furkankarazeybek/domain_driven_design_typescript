import { injectable } from "inversify";



@injectable()
class Authorize  {

    async findPermissionFromPermissionIds (permissionIds : string[]) {

        console.log(permissionIds);
    }


}

export default Authorize;