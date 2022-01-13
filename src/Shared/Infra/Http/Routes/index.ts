import { Router } from 'express';
import { authenticateRoutes } from './Authenticate.routes';

import { routeThemes } from './Theme.routes';
import { routeUsers } from './User.routes';
import { routeArticles } from './Article.routes';
import { routeItemSales } from './ItemSale.routes';

const router = Router();

router.use('/', authenticateRoutes);

router.use('/themes', routeThemes);
router.use('/users', routeUsers);
router.use('/article', routeArticles);
router.use('/sale', routeItemSales);

export { router };
