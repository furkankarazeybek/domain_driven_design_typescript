import { container } from "../../../inversify.config";
import { TYPES } from "../../../types";
import { RoleService } from "../../domain/role/role-service";
import { UserRoleService } from "../../domain/user-role/user-role-service";
import { UserService } from "../../domain/user/user-service";
import express from 'express';

const userRouter = express.Router();

const userService = container.get<UserService>(TYPES.UserService);
const roleService = container.get<RoleService>(TYPES.RoleService);
const userRoleService = container.get<UserRoleService>(TYPES.UserRoleService);

userRouter.get('/users', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
    
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.post('/addUser', async (req, res) => {
  try {
    const { userName, roleId } = req.body;
    const user = await userService.createUser(userName, roleId);
    const userJson = JSON.stringify(user);
    const userObj = JSON.parse(userJson);
    const userId = userObj._id;
    userRoleService.createUserRole(userId, roleId);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});





export { userRouter };
