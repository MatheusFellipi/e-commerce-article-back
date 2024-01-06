import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListArticlesUseCase } from './ListArticleUseCase';

class ListArticlesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listThemesUseCase = container.resolve(ListArticlesUseCase);
    const all = await listThemesUseCase.execute();

    return response.status(200).json(all);
  }
}

export { ListArticlesController };
