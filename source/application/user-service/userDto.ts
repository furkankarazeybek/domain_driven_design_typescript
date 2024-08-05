
export class UserDto {

    static getRoleIdsFromEntities(users: any[], roles: any[] ): string[] {

    const usersListWithRoles: any[] = [];

   
    // for (const user of users) {

    // }

    for (let userIndex = 0; userIndex < users.length; userIndex++) {

        const userRoleIds =  users.map(entity => entity.roleId);
        const user = users[userIndex];
        const userRoles: any[] = [];

        const roleId = userRoleIds[userIndex];

        for (let i = 0; i < 1; i++) {
          const role = roles.find((p: any) => p._id.equals(roleId));

      
          if (role) {
            userRoles.push(role);
          }
        }
        

        const roleName: string = userRoles.map((role: any) => role.roleName).join(', '); 
        usersListWithRoles.push({
          _id: user._id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          password: user.password,
          roleName: roleName,
          role: userRoles
        });
      }

      return usersListWithRoles;
        
    }


    
}