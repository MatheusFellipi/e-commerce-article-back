import multer from 'multer';
import { CreateArticleController } from '@Modules/Article/UseCases/Articles/CreateArticles/CreateArticleController';
import { ListArticlesController } from '@Modules/Article/UseCases/Articles/ListCreate/ListArticleController';

import { Router } from 'express';

import { ensureAuthenticated } from '../Middlewares/EnsureAuthenticated';

const routeArticles = Router();

const createArticleController = new CreateArticleController();
const listArticlesController = new ListArticlesController();

routeArticles.get('/', listArticlesController.handle);
//routeArticles.get('/:id', listArticlesController.handle);
routeArticles.post('/', ensureAuthenticated, createArticleController.handle);

export { routeArticles };
