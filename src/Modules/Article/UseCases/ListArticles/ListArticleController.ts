import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListArticlesUseCase } from './ListArticleUseCase';

class ListArticlesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page = 1, page_size = 20 } = request.query;
    const listThemesUseCase = container.resolve(ListArticlesUseCase);
    const all = await listThemesUseCase.execute({ page, page_size });

    return response.status(200).json(all);
  }
}

export { ListArticlesController };
