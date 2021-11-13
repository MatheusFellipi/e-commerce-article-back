import { Router } from 'express';
import { authenticateRoutes } from './Authenticate.routes';

import { routeThemes } from './theme.routes';
import { routeUsers } from './user.routes';

const router = Router();

router.use('/', authenticateRoutes);

router.use('/themes', routeThemes);
router.use('/users', routeUsers);

export { router };
