import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListByIdArticlesUseCase } from './ListByIdArticleUseCase';

class ListByIdArticlesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const listThemesUseCase = container.resolve(ListByIdArticlesUseCase);
    const all = await listThemesUseCase.execute(id);
    console.log(all);
    
    return response.status(200).json(all);
  }
}

export { ListByIdArticlesController };
