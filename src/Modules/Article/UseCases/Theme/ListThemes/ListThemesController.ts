import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListThemesUseCase } from './ListThemesUseCase';

class ListThemesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listThemesUseCase = container.resolve(ListThemesUseCase);
    const all = await listThemesUseCase.execute();

    return response.status(200).json(all);
  }
}

export { ListThemesController };
