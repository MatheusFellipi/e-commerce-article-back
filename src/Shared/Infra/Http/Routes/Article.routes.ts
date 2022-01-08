import multer from 'multer';
import { CreateArticleController } from '@Modules/Article/UseCases/Articles/CreateArticles/CreateArticleController';

import { Router } from 'express';

import { ensureAuthenticated } from '../Middlewares/EnsureAuthenticated';

const routeArticles = Router();

const createArticleController = new CreateArticleController();

routeArticles.use(ensureAuthenticated);
routeArticles.post('/', createArticleController.handle);

export { routeArticles };
