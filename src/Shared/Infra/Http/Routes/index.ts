import { authenticateRoutes } from './Authenticate.routes';
import { routeArticles } from './Article.routes';
import { routeDash } from './Dash.routes';
import { routeItemSales } from './ItemSale.routes';
import { Router } from 'express';
import { routeThemes } from './theme.routes';
import { routeUsers } from './user.routes';


const router = Router();

router.use('/', authenticateRoutes);

router.use('/dashboard', routeDash);
router.use('/themes', routeThemes);
router.use('/users', routeUsers);
router.use('/article', routeArticles);
router.use('/sale', routeItemSales);

export { router };
