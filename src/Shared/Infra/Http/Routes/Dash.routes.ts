import { Router } from 'express';

import { DashboradController } from '@Modules/Accounts/UseCases/Dashborad/DashboradUsersController';
import { PublishedUsersController } from '@Modules/Accounts/UseCases/Dashborad/Published/PublishedUsersController';
import { PurchasedUsersController } from '@Modules/Accounts/UseCases/Dashborad/Purchased/PurchasedUsersController';
import { ensureAuthenticated } from '../Middlewares/EnsureAuthenticated';

const dashboradController = new DashboradController();
const publishedUsersController = new PublishedUsersController();
const purchasedUsersController = new PurchasedUsersController();

const routeDash = Router();
routeDash.use(ensureAuthenticated);
routeDash.get('/', dashboradController.handle);
routeDash.get('/published', publishedUsersController.handle);
routeDash.get('/purchased', purchasedUsersController.handle);

export { routeDash };
