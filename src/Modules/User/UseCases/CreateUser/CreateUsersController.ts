import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUsersUseCase } from './CreateUsersUseCase';

class CreateThemeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password, email } = request.body;

    const createCategoryUseCase = container.resolve(CreateUsersUseCase);
    await createCategoryUseCase.execute({
      name, password, email
    });

    return response.status(201).send();
  }
}
export { CreateThemeController };
