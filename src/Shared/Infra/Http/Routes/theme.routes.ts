import { Router } from 'express';
import { CreateThemeController } from '@Modules/Article/UseCases/Theme/CreateThemeController';
import { ensureAuthenticated } from '../Middlewares/ensureAuthenticated';

const routeThemes = Router();
const createThemeController = new CreateThemeController();

routeThemes.use(ensureAuthenticated);
routeThemes.post('/', createThemeController.handle);

export { routeThemes };
