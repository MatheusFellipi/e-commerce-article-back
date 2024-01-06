import { DashboardController } from '@Modules/Accounts/UseCases/Dashboard/general/DashboardUsersController';
import { ensureAuthenticated } from '../Middlewares/ensureAuthenticated';
import { PublishedUsersController } from '@Modules/Accounts/UseCases/Dashboard/Published/PublishedUsersController';
import { PurchasedUsersController } from '@Modules/Accounts/UseCases/Dashboard/Purchased/PurchasedUsersController';
import { Router } from 'express';



const dashboardController = new DashboardController();
const publishedUsersController = new PublishedUsersController();
const purchasedUsersController = new PurchasedUsersController();

const routeDash = Router();
routeDash.use(ensureAuthenticated);
routeDash.get('/', dashboardController.handle);
routeDash.get('/published', publishedUsersController.handle);
routeDash.get('/purchased', purchasedUsersController.handle);

export { routeDash };
