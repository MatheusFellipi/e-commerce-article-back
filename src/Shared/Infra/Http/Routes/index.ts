import { Router } from 'express';
import { authenticateRoutes } from './Authenticate.routes';

import { routeThemes } from './Theme.routes';
import { routeUsers } from './User.routes';

const router = Router();

router.use('/', authenticateRoutes);

router.use('/themes', routeThemes);
router.use('/users', routeUsers);

export { router };
