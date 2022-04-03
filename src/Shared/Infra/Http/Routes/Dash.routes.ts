import { Router } from 'express';

import { DashboradController } from '@Modules/Accounts/UseCases/Dashborad/DashboradUsersController';
import { ensureAuthenticated } from '../Middlewares/EnsureAuthenticated';

const dashboradController = new DashboradController();

const routeDash = Router();
routeDash.use(ensureAuthenticated)
routeDash.get('/', dashboradController.handle);

export { routeDash };
