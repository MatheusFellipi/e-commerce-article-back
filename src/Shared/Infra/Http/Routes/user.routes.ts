import { CreateUsersController } from '@Modules/Accounts/UseCases/CreateUser/CreateUsersController';
import { Router } from 'express';

const routeUsers = Router();
const createUsersController = new CreateUsersController();

routeUsers.post('/', createUsersController.handle);

export { routeUsers };
