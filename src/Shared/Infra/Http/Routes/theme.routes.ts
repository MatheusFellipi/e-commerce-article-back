import { Router } from 'express';

import { CreateThemeController } from '@Modules/Article/UseCases/Theme/CreateTheme/CreateThemeController';
import { ListThemesController } from '@Modules/Article/UseCases/Theme/ListThemes/ListThemesController';
import { ensureAuthenticated } from '../Middlewares/EnsureAuthenticated';

const routeThemes = Router();
const createThemeController = new CreateThemeController();
const listThemesController = new ListThemesController();

routeThemes.use(ensureAuthenticated);
routeThemes.post('/', createThemeController.handle);
routeThemes.get('/', listThemesController.handle);

export { routeThemes };
