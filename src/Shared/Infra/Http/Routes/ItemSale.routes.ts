import { Router } from 'express';

import { CreateSaleItemController } from '@Modules/Sales/UseCases/CreateSaleItem/CreateSaleItemController';
import { ensureAuthenticated } from '../Middlewares/ensureAuthenticated';


const routeItemSales = Router();

const createSaleItemController = new CreateSaleItemController();

routeItemSales.post('/', ensureAuthenticated, createSaleItemController.handle);

export { routeItemSales };
