import multer from 'multer';
import { CreateSaleItemController } from '@Modules/Sales/UseCases/Sales/CreateSaleItem/CreateSaleItemController';
import { ensureAuthenticated } from '../Middlewares/EnsureAuthenticated';

import { Router } from 'express';

const routeItemSales = Router();

const createSaleItemController = new CreateSaleItemController();

routeItemSales.post('/', ensureAuthenticated, createSaleItemController.handle);

export { routeItemSales };
