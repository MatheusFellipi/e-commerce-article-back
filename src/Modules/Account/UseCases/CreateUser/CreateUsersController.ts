import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUsersUseCase } from './CreateUsersUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, job_role, img_url } = request.body;

    const createCategoryUseCase = container.resolve(CreateUsersUseCase);

    await createCategoryUseCase.execute({
      name,
      email,
      password,
      job_role,
      img_url,
    });

    return response.status(201).send();
  }
}
export { CreateUserController };
