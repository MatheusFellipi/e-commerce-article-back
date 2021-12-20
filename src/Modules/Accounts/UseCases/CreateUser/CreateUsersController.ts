import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUsersUseCase } from './CreateUsersUseCase';

export class CreateUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, job_role, avatar } = request.body;

    const createUsersUseCase = container.resolve(CreateUsersUseCase);

    await createUsersUseCase.execute({
      name,
      email,
      password,
      job_role,
      avatar,
    });

    return response.status(201).send();
  }
}
