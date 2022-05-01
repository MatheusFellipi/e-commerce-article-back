import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DashboradUsersUseCase } from './PurchasedUsersUseCase';

export class PurchasedUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const createUsersUseCase = container.resolve(DashboradUsersUseCase);
    const res = await createUsersUseCase.execute({ id });

    return response.status(201).send(res);
  }
}
