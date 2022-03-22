import multer from 'multer';
import { CreateArticleController } from '@Modules/Article/UseCases/Articles/CreateArticles/CreateArticleController';
import { ListArticlesController } from '@Modules/Article/UseCases/Articles/ListArticles/ListArticleController';

import { Router } from 'express';

import { ensureAuthenticated } from '../Middlewares/EnsureAuthenticated';
import { ListByIdArticlesController } from '@Modules/Article/UseCases/Articles/ListByIdArticles/ListByIdArticleController';

const routeArticles = Router();

const createArticleController = new CreateArticleController();
const listArticlesController = new ListArticlesController();
const listByIdArticlesController = new ListByIdArticlesController()

routeArticles.get('/', listArticlesController.handle);
routeArticles.get('/:id', listByIdArticlesController.handle);
routeArticles.post('/', ensureAuthenticated, createArticleController.handle);

export { routeArticles };
