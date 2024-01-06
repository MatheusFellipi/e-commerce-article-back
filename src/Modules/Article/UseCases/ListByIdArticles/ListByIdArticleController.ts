import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListByIdArticlesUseCase } from './ListByIdArticleUseCase';

class ListByIdArticlesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user = request.user;
    const listThemesUseCase = container.resolve(ListByIdArticlesUseCase);
    const article = await listThemesUseCase.execute(id, user.id);
    article.themes = JSON.parse(article.themes);
    return response.status(200).json(article);
  }
}

export { ListByIdArticlesController };
