import { DashboradController } from '@Modules/Accounts/UseCases/Dashboard/DashboardUsersController';
import { PublishedUsersController } from '@Modules/Accounts/UseCases/Dashboard/Published/PublishedUsersController';
import { PurchasedUsersController } from '@Modules/Accounts/UseCases/Dashboard/Purchased/PurchasedUsersController';
import { Router } from 'express';


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
