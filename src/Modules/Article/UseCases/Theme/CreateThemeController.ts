import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateThemeUseCase } from './CreateThemeUseCase';

class CreateThemeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { theme } = request.body;

    const createCategoryUseCase = container.resolve(CreateThemeUseCase);
    await createCategoryUseCase.execute({
      theme,
    });

    return response.status(201).send();
  }
}
export { CreateThemeUseCase };
