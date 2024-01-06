import { CreateArticleController } from '@Modules/Article/UseCases/CreateArticles/CreateArticleController';
import { ensureAuthenticated } from '../Middlewares/EnsureAuthenticated';
import { ListArticlesController } from '@Modules/Article/UseCases/ListArticles/ListArticleController';
import { ListByIdArticlesController } from '@Modules/Article/UseCases/ListByIdArticles/ListByIdArticleController';
import { Router } from 'express';

const routeArticles = Router();

const createArticleController = new CreateArticleController();
const listArticlesController = new ListArticlesController();
const listByIdArticlesController = new ListByIdArticlesController();

routeArticles.get('/', listArticlesController.handle);
routeArticles.use(ensureAuthenticated);
routeArticles.get('/:id', listByIdArticlesController.handle);
routeArticles.post('/', createArticleController.handle);

export { routeArticles };
