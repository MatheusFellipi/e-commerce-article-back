import { Router } from 'express';

import { routeThemes } from './theme.routes';
import { routeUsers } from './user.routes';

const router = Router();

router.use('/themes', routeThemes);
router.use('/users', routeUsers);

export { router };
