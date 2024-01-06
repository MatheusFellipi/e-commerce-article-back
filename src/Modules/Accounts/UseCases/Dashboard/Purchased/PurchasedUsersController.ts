import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { PurchasedUsersUseCase } from './PurchasedUsersUseCase';

export class PurchasedUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const createUsersUseCase = container.resolve(PurchasedUsersUseCase);
    const res = await createUsersUseCase.execute({ id });

    return response.status(201).send(res);
  }
}
