import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUsersUseCase } from './CreateUsersUseCase';

export class CreateUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, job_role, img_url } = request.body;

    const createUsersUseCase = container.resolve(CreateUsersUseCase);

    await createUsersUseCase.execute({
      name,
      email,
      password,
      job_role,
      img_url,
    });

    return response.status(201).send();
  }
}
